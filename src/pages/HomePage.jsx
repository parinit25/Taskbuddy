import React, { useEffect, useState } from "react";
import TaskTable from "../components/tasks/TaskTable";
import { useAuth } from "../context/useAuth";

const HomePage = () => {
  const [tasks, setTasks] = useState();
  const { user } = useAuth();

  const getTasksTable = async () => {
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
        return;
      }
      const tasksArray = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      console.log("Formatted tasks:", tasksArray);
      if (tasksArray.length > 0) {
        setTasks(tasksArray);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const addTodoHandler = async (todo) => {
    console.log(todo);
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

  useEffect(() => {
    getTasksTable();
  }, [user]);

  return (
    <div>
      <TaskTable tasks={tasks} addTodoHandler={addTodoHandler} />
    </div>
  );
};

export default HomePage;
