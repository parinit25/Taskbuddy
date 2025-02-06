import React, { useState } from "react";
import styles from "./TableCompleted.module.scss";

const BoardComponent = ({ view, tasks }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true); // State for accordion

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <section className={styles.section_table_todo}>
      <div className={styles.board_view}>
        <div className={styles.board_column}>
          <div className={styles.board_header}>To-Do</div>
          <div className={styles.board_content}>No Tasks in To-Do</div>
        </div>
        <div className={styles.board_column}>
          <div className={styles.board_header}>In-Progress</div>
          <div className={styles.board_content}>No Tasks In Progress</div>
        </div>
        <div className={styles.board_column}>
          <div className={styles.board_header}>Completed</div>
          <div className={styles.board_content}>No Completed Tasks</div>
        </div>
      </div>
    </section>
  );
};

export default BoardComponent;
