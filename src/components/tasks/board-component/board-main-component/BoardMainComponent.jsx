import React from "react";
import BoardComplete from "../board-complete/BoardComplete";
import BoardInProgress from "../board-inprogress/BoardInProgress";
import BoardTodo from "../board-todo/BoardTodo";
import styles from "./BoardMainComponent.module.scss";

const BoardMainComponent = () => {
  return (
    <section className={styles.section_table_todo}>
      <div className={styles.board_view}>
        <BoardTodo />
        <BoardInProgress />
        <BoardComplete />
      </div>
    </section>
  );
};

export default BoardMainComponent;
