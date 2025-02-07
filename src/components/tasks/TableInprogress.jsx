import React, { useState } from "react";
import styles from "./TableInProgress.module.scss";

const TableInProgress = ({ view, tasks }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true); // State for accordion

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <section className={styles.section_table_todo}>
      <div className={styles.list_view}>
        <div className={styles.accordion}>
          <div className={styles.accordion_header} onClick={toggleAccordion}>
            <span>In Progress ({tasks?.length})</span>
            <button>{isAccordionOpen ? "▲" : "▼"}</button>
          </div>

          {isAccordionOpen && (
            <div className={styles.accordion_content}>
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
                  {tasks?.length > 0 ? (
                    tasks?.map((task, index) => (
                      <tr key={index}>
                        <td>{task.title}</td>
                        <td>{task.dueDate}</td>
                        <td>
                          <span className={styles.task_status}>
                            {task.status}
                          </span>
                        </td>

                        <td>{task.category}</td>
                      </tr>
                    ))
                  ) : (
                    <div className={styles.empty_accordion}>
                      No tasks in Progress
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TableInProgress;
