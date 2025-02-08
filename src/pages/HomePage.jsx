import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useTasks } from "../context/TaskContext";
import TaskTable from "../components/tasks/list/main-component/TaskTable";

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
