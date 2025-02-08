import React, { useState } from "react";
import styles from "./TableCompleted.module.scss";
import { useTasks } from "../../../../context/TaskContext";
import { Icon } from "@iconify/react";
import ListComponent from "../components/ListComponent";

const TableCompleted = () => {
  const { tasks } = useTasks();
  const completedTasks = tasks?.filter(
    (item) => item.status === "Completed"
  );
  const [isAccordionOpen, setIsAccordionOpen] = useState(true); // State for accordion

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  return (
    <section className={styles.section_table_todo}>
      <div className={styles.list_view}>
        <div className={styles.accordion}>
          <div className={styles.accordion_header} onClick={toggleAccordion}>
            <span>Completed ({completedTasks?.length})</span>
            <button>{isAccordionOpen ? "▲" : "▼"}</button>
          </div>

          {isAccordionOpen && (
            <div className={styles.accordion_content}>
              <ListComponent tasks={completedTasks} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TableCompleted;
