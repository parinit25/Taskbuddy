import React, { useEffect, useState } from "react";
import TaskTable from "../components/tasks/main-component/TaskTable";
import { useAuth } from "../context/useAuth";
import { useTasks } from "../context/TaskContext";

const HomePage = () => {
  // const [tasks, setTasks] = useState();
  const { user } = useAuth();
  const { tasks, addTodoHandler, getTasksTable } = useTasks();

  return (
    <div>
      <TaskTable tasks={tasks} addTodoHandler={addTodoHandler} />
    </div>
  );
};

export default HomePage;
