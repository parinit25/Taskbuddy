import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input
  const { user } = useAuth();

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
    }
  };

  // Filtered tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (user) {
      getTasksTable();
    }
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks, // Use filtered tasks instead of all tasks
        addTodoHandler,
        getTasksTable,
        deleteTaskHandler,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
