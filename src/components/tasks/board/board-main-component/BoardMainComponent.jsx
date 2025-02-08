import React, { useState } from "react";
import { useTasks } from "../../../../context/TaskContext";
import BoardComponent from "../components/BoardComponent";
import styles from "./BoardMainComponent.module.scss";

const BoardMainComponent = () => {
  const { tasks } = useTasks();

  // Filter tasks by status
  const filterTask = {
    todo: tasks.filter((item) => item.status === "Todo"),
    pending: tasks.filter((item) => item.status === "In Progress"),
    completed: tasks.filter((item) => item.status === "Completed"),
  };

  return (
    <section className={styles.section_table_todo}>
      <div className={styles.board_view}>
        {/* Pass each filtered task list separately to BoardComponent */}
        <BoardComponent tasks={filterTask.todo} title="To-Do" />
        <BoardComponent tasks={filterTask.pending} title="In Progress" />
        <BoardComponent tasks={filterTask.completed} title="Completed" />
      </div>
    </section>
  );
};

export default BoardMainComponent;
