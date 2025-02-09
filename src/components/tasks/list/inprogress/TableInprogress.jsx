import React, { useState } from "react";
import ListComponent from "../components/ListComponent";
import styles from "./TableInProgress.module.scss";
import { useTasks } from "../../../../context/TaskContext";

const TableInProgress = () => {
  const { tasks } = useTasks();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const pendingTasks = tasks?.filter((item) => item.status === "In Progress");

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <section className={styles.section_table_todo}>
      <div className={styles.list_view}>
        <div className={styles.accordion}>
          <div className={styles.accordion_header} onClick={toggleAccordion}>
            <span>In Progress ({pendingTasks?.length})</span>
            <button>{isAccordionOpen ? "▲" : "▼"}</button>
          </div>
          {isAccordionOpen && (
            <div className={styles.accordion_content}>
              <ListComponent tasks={pendingTasks} title="In Progress" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TableInProgress;
