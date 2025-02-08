import { Icon } from "@iconify/react";
import React from "react";
import { useTasks } from "../../../../context/TaskContext";
import styles from "../board-main-component/BoardMainComponent.module.scss";

const BoardComplete = () => {
  const { tasks } = useTasks();
  const completedTasks = tasks.filter((item) => item.status === "Completed");

  return (
    <div className={styles.board_column}>
      <div className={styles.board_header_completed}>Completed</div>

      {completedTasks.map((item) => (
        <div className={styles.main_container}>
          <div className={styles.title_icon_container}>
            <div className={styles.board_content}>{item?.title}</div>
            <div className={styles.edit_button_container}>
              <Icon
                icon="solar:menu-dots-bold"
                width="24"
                height="24"
                className={styles.options_button}
              />
              <div className={styles.edit_delete_card_container}>
                <ul>
                  <li>
                    <Icon icon="mynaui:edit" width="16" height="16" />
                    <span> Edit</span>
                  </li>
                  <li>
                    <Icon
                      icon="mi:delete"
                      width="16"
                      height="16"
                      style={{ color: "red" }}
                    />
                    <span>Delete</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.status_date_container}>
            <span>{item.category}</span>
            <span>{item.dueDate}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardComplete;
