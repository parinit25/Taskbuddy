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

      // Convert object to array
      const tasksArray = Object.entries(data).map(([key, value]) => ({
        id: key, // Keeping Firebase ID
        ...value, // Spread existing task properties
      }));

      console.log("Formatted tasks:", tasksArray);

      return tasksArray; // Store in state if using React
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Example usage inside useEffect
  useEffect(() => {
    getTasksTable().then((tasks) => {
      if (tasks) {
        setTasks(tasks); // Assuming you have `const [tasks, setTasks] = useState([]);`
      }
    });
  }, [user]);

  useEffect(() => {
    getTasksTable();
  }, []);

  return (
    <div>
      <TaskTable tasks={tasks} />
    </div>
  );
};

export default HomePage;
