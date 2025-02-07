import React, { useState } from "react";
import styles from "./TaskTable.module.scss";
import TableTodo from "./TableTodo";
import TableInProgress from "./TableInprogress";
import TableCompleted from "./TableCompleted";
import BoardComponent from "./BoardComponent";
import ViewToggle from "../view-toggle/ViewToggle";
import TaskHeader from "../task-header/TaskHeader";

const TaskTable = ({ tasks, addTodoHandler }) => {
  const [view, setView] = useState("list");

  return (
    <section className={styles.section_table_todo}>
      <ViewToggle view={view} setView={setView} />
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
          <TableTodo
            view={view}
            tasks={tasks?.filter((item) => item.status === "Todo")}
            addTodoHandler={addTodoHandler}
          />
          <TableInProgress
            view={view}
            tasks={tasks?.filter((item) => item.status === "In Progress")}
          />
          <TableCompleted
            view={view}
            tasks={tasks?.filter((item) => item.status === "Completed")}
          />
        </>
      ) : (
        <BoardComponent />
      )}
    </section>
  );
};

export default TaskTable;
