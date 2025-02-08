import React, { useState } from "react";
import styles from "./TableCompleted.module.scss";
import { useTasks } from "../../../context/TaskContext";
import { Icon } from "@iconify/react";

const TableCompleted = ({ view }) => {
  const { tasks, addTodoHandler, getTasksTable } = useTasks();
  const completedTasks = tasks?.filter((item) => item.status === "Completed");
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
              <table className={styles.accordion_content_table}>
                <thead className={styles.accordion_content_table_head}>
                  <tr>
                    {/* <th></th> */}
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {completedTasks?.length > 0 ? (
                    completedTasks
                      ?.filter((item) => item.status === "Completed")
                      .map((task, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              className={styles.task_icons_1}
                            />
                            <Icon
                              className={styles.task_icons_2}
                              icon="lsicon:drag-outline"
                              width="24"
                              height="24"
                            />
                            <Icon
                              className={styles.task_icons_3}
                              icon="mdi:tick-circle"
                              width="20"
                              height="20"
                            />
                            {task.title}
                          </td>
                          <td className={styles.task_due_date}>
                            {task.dueDate}
                          </td>
                          <td>
                            <span className={styles.task_status}>
                              {task.status}
                            </span>
                          </td>
                          <td className={styles.task_category}>
                            {task.category}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <div className={styles.empty_accordion}>
                      No tasks in Completed
                    </div>
                  )}
                </tbody>
              </table>{" "}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TableCompleted;
