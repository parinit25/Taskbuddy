import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasksSelected, setTasksSelected] = useState([]); // Store selected task IDs
  const { user } = useAuth();
  const [filter, setFilter] = useState({
    category: "",
    dueDate: "",
  });

  const getTasksTable = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `https://task-buddy-f099c-default-rtdb.firebaseio.com/tasks/${user.sub}.json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (!data) {
        console.log("No tasks found.");
        setTasks([]);
        return;
      }

      const tasksArray = Object.entries(data).map(([key, value]) => ({
        key,
        ...value,
      }));

      console.log("Formatted tasks:", tasksArray);
      setTasks(tasksArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTodoHandler = async (todo) => {
    if (!user) return;

    const newTodo = {
      ...todo,
      id: Math.random(),
    };

    try {
      const response = await fetch(
        `https://task-buddy-f099c-default-rtdb.firebaseio.com/tasks/${user.sub}.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo),
        }
      );

      if (response.ok) {
        getTasksTable();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTaskHandler = async (key) => {
    try {
      const response = await fetch(
        `https://task-buddy-f099c-default-rtdb.firebaseio.com/tasks/${user.sub}/${key}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        getTasksTable();
      } else throw new Error("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMultipleTasksHandler = async () => {
    try {
      for (let item of tasksSelected) {
        await deleteTaskHandler(item);
      }
      setTasksSelected([]); // Clear selection after deletion
    } catch (error) {
      console.log(error);
    }
  };

  // API to update status of a single task
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(
        `https://task-buddy-f099c-default-rtdb.firebaseio.com/tasks/${user.sub}/${taskId}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        getTasksTable();
      } else throw new Error("Failed to update status");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // API to update multiple tasks' statuses at once
  const updateMultipleTaskStatuses = async (taskIds, newStatus) => {
    try {
      const updatePromises = taskIds.map((taskId) =>
        fetch(
          `https://task-buddy-f099c-default-rtdb.firebaseio.com/tasks/${user.sub}/${taskId}.json`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          }
        )
      );

      await Promise.all(updatePromises);
      await getTasksTable();
      setTasksSelected([]);
    } catch (error) {
      console.error("Error updating multiple task statuses:", error);
    }
  };

  // API to edit a task's fields (title, due date, category, etc.)
  const editTask = async (taskId, updatedFields) => {
    try {
      const response = await fetch(
        `https://task-buddy-f099c-default-rtdb.firebaseio.com/tasks/${user.sub}/${taskId}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFields),
        }
      );

      if (response.ok) {
        getTasksTable();
      } else throw new Error("Failed to update task");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Toggle task selection in array
  const toggleTaskSelection = (taskId) => {
    if (taskId === "clear") {
      setTasksSelected([]);
    } else {
      setTasksSelected((prev) =>
        prev.includes(taskId)
          ? prev.filter((id) => id !== taskId)
          : [...prev, taskId]
      );
    }
  };

  // Filtered tasks based on search query
  const filteredTasks = tasks
    .filter((task) =>
      task.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task) =>
      filter.category ? task.category === filter.category : true
    )
    .sort((a, b) => {
      if (filter.dueDate === "Newest First") {
        return new Date(b.dueDate) - new Date(a.dueDate);
      } else if (filter.dueDate === "Oldest First") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  useEffect(() => {
    if (user) {
      getTasksTable();
    }
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addTodoHandler,
        getTasksTable,
        deleteTaskHandler,
        searchQuery,
        setSearchQuery,
        tasksSelected,
        toggleTaskSelection,
        deleteMultipleTasksHandler,
        updateTaskStatus,
        updateMultipleTaskStatuses,
        editTask,
        filter,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
