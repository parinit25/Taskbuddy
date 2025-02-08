import React, { useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import TaskHeader from "../../task-header/TaskHeader";
import ViewToggle from "../../view-toggle/ViewToggle";
import TableCompleted from "../completed/TableCompleted";
import TableInProgress from "../inprogress/TableInprogress";
import TableTodo from "../todo/TableTodo";
import styles from "./TaskTable.module.scss";
import BoardMainComponent from "../board-component/board-main-component/BoardMainComponent";

const TaskTable = () => {
  const { width, height } = useWindowSize();
  const [view, setView] = useState("list");

  useEffect(() => {
    if (width < 600) {
      setView("list");
    }
  }, [width]);

  return (
    <section className={styles.section_table_todo}>
      {width > 600 && <ViewToggle view={view} setView={setView} />}
      <TaskHeader />
      {view === "list" ? (
        <>
          <div className={styles.list_view}>
            <table className={styles.table_header}>
              <thead>
                <tr>
                  <th align="left">Task Name</th>
                  <th align="left">Due On</th>
                  <th align="left">Task Status</th>
                  <th align="left">Task Category</th>
                </tr>
              </thead>
            </table>
          </div>
          <TableTodo view={view} />
          <TableInProgress view={view} />
          <TableCompleted view={view} />
        </>
      ) : (
        <BoardMainComponent />
      )}
    </section>
  );
};

export default TaskTable;
