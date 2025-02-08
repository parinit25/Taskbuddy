import React from "react";
import styles from "./ListComponent.module.scss";
import { useTasks } from "../../../../context/TaskContext";
import { Icon } from "@iconify/react";

const ListComponent = ({ tasks }) => {
  const { deleteTaskHandler } = useTasks();
  const deleteTaskHandlerAction = (key) => {
    deleteTaskHandler(key);
  };
  return (
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
              <td className={styles.task_title}>
                <input type="checkbox" className={styles.task_icons_1} />
                <Icon
                  className={styles.task_icons_2}
                  icon="lsicon:drag-outline"
                  width="24"
                  height="24"
                />
                <Icon
                  className={styles.task_icons_3}
                  style={{ color: task?.status === "Completed" ? "green" : "" }}
                  icon="mdi:tick-circle"
                  width="20"
                  height="20"
                />
                <span>{task.title}</span>
              </td>
              <td className={styles.task_due_date}>
                <span>{task.dueDate}</span>
              </td>
              <td className={styles.task_status}>
                <span>{task.status}</span>
              </td>
              <td className={styles.task_category}>{task.category}</td>
              <td className={styles.options_td}>
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
                      <li onClick={() => deleteTaskHandlerAction(task?.key)}>
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
              </td>
            </tr>
          ))
        ) : (
          <div className={styles.empty_accordion}>No tasks in Todo</div>
        )}
      </tbody>
    </table>
  );
};

export default ListComponent;
