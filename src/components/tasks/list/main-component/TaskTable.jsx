import React, { useEffect, useState } from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import TaskHeader from "../../../task-header/TaskHeader";
import ViewToggle from "../../../view-toggle/ViewToggle";
import TableCompleted from "../completed/TableCompleted";
import TableInProgress from "../inprogress/TableInprogress";
import TableTodo from "../todo/TableTodo";
import styles from "./TaskTable.module.scss";
import BoardMainComponent from "../../board/board-main-component/BoardMainComponent";
import { useTasks } from "../../../../context/TaskContext";

const TaskTable = () => {
  const { width, height } = useWindowSize();
  const [view, setView] = useState("list");
  const { tasks, searchQuery } = useTasks();

  // Filter tasks by status
  const filterTask = {
    todo: tasks.filter((item) => item.status === "Todo"),
    pending: tasks.filter((item) => item.status === "In Progress"),
    completed: tasks.filter((item) => item.status === "Completed"),
  };

  useEffect(() => {
    if (width < 600) {
      setView("list");
    }
  }, [width]);

  return (
    <section className={styles.section_table_todo}>
      {width > 600 && <ViewToggle view={view} setView={setView} />}
      <TaskHeader />
      {tasks.length === 0 && searchQuery ? (
        <div className={styles.empty_task_style}>
          <div>
            <img src="assets/no-tasks.png" />
            <p>It looks like we can't find any results that match.</p>
          </div>
        </div>
      ) : (
        <>
          {view === "list" ? (
            <>
              <div className={styles.list_view}>
                <table className={styles.table_header}>
                  <thead>
                    <tr>
                      <th>Task Name</th>
                      <th>Due On</th>
                      <th>Task Status</th>
                      <th>Task Category</th>
                      <th></th>
                    </tr>
                  </thead>
                </table>
              </div>
              <TableTodo view={view} todoTasks={filterTask.todo} />
              <TableInProgress view={view} pendingTasks={filterTask.pending} />
              <TableCompleted
                view={view}
                completedTasks={filterTask.completed}
              />
            </>
          ) : (
            <BoardMainComponent />
          )}
        </>
      )}
    </section>
  );
};

export default TaskTable;
