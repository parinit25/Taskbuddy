import React from "react";
import styles from "../board-main-component/BoardMainComponent.module.scss";
import { Icon } from "@iconify/react";
import { useTasks } from "../../../../context/TaskContext";

const BoardComponent = ({ tasks, title }) => {
  const { deleteTaskHandler } = useTasks();

  const deleteTaskHandlerAction = (key) => {
    deleteTaskHandler(key);
  };

  // Apply class directly to the board_header div
  const generateClassNames = () => {
    if (title === "Completed") return styles.board_header_completed;
    else if (title === "In Progress") return styles.board_header_pending;
    return styles.board_header_todo;
  };

  return (
    <div className={styles.board_column}>
      <div className={`${styles.board_header} ${generateClassNames()}`}>
        <span>{title}</span>
      </div>

      {tasks.length > 0 ? (
        tasks.map((item) => (
          <div key={item.id} className={styles.main_container}>
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
                    <li onClick={() => deleteTaskHandlerAction(item?.key)}>
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
        ))
      ) : (
        <div className={styles.main_container}>
          <p className={styles.no_tasks}>
            No tasks in {title === "In Progress" ? "Progress" : title}
          </p>
        </div>
      )}
    </div>
  );
};

export default BoardComponent;
