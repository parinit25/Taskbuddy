import React, { useState } from "react";
import styles from "./TableInProgress.module.scss";

const TableInProgress = ({ view, tasks }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true); // State for accordion

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <section className={styles.section_table_todo}>
      {view === "list" ? (
        <div className={styles.list_view}>
          <div className={styles.accordion}>
            <div className={styles.accordion_header} onClick={toggleAccordion}>
              <span>In Progress (3)</span>
              <button>{isAccordionOpen ? "▲" : "▼"}</button>
            </div>

            {isAccordionOpen && (
              <table className={styles.accordion_content_table}>
                <thead className={styles.accordion_content_table_head}>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.title}</td>
                      <td>{task.dueDate}</td>
                      <td>{task.status}</td>
                      <td>{task.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.board_view}>
          {/* <div className={styles.board_column}>
            <div className={styles.board_header}>To-Do</div>
            <div className={styles.board_content}>No Tasks in To-Do</div>
          </div> */}
          <div className={styles.board_column}>
            <div className={styles.board_header}>In-Progress</div>
            <div className={styles.board_content}>No Tasks In Progress</div>
          </div>
          {/* <div className={styles.board_column}>
            <div className={styles.board_header}>Completed</div>
            <div className={styles.board_content}>No Completed Tasks</div>
          </div> */}
        </div>
      )}
    </section>
  );
};

export default TableInProgress;
