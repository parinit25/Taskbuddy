import React from "react";
import { Outlet } from "react-router";
import Header from "../components/header/Header";
import styles from "./ProtectedLayout.module.scss";
import { useTasks } from "../context/TaskContext";
import { Icon } from "@iconify/react";

const ProtectedLayout = () => {
  const {
    tasksSelected,
    toggleTaskSelection,
    deleteMultipleTasksHandler,
    updateMultipleTaskStatuses,
  } = useTasks();

  const multipleDeleteHandler = (taskSelected) => {
    deleteMultipleTasksHandler(taskSelected);
  };

  const updateMultipleTaskHandler = (taskIds, newStatus) => {
    updateMultipleTaskStatuses(taskIds, newStatus);
  };

  return (
    <div>
      <Header />
      <main className={styles.main_body}>
        <Outlet />
      </main>
      {tasksSelected.length > 0 && (
        <div className={styles.filter_task_modal}>
          <div className={styles.main_button_container}>
            <button
              className={`${styles.button} ${styles.task_selected_button}`}
            >
              {tasksSelected.length}{" "}
              {tasksSelected.length > 1 ? "Tasks" : "Task"} Selected{" "}
              <Icon
                icon="ic:round-close"
                width="20"
                height="20"
                className={styles.task_clear_button}
                onClick={() => toggleTaskSelection("clear")}
              />
            </button>
            <div className={styles.edit_delete_container}>
              <div className={styles.edit_modal_container}>
                <button className={`${styles.button} ${styles.status_button}`}>
                  Status
                </button>
                <div className={styles.status_modal_container}>
                  <ul>
                    <li
                      onClick={() =>
                        updateMultipleTaskHandler(tasksSelected, "Todo")
                      }
                    >
                      Todo
                    </li>
                    <li
                      onClick={() =>
                        updateMultipleTaskHandler(tasksSelected, "In Progress")
                      }
                    >
                      In Progress
                    </li>
                    <li
                      onClick={() =>
                        updateMultipleTaskHandler(tasksSelected, "Completed")
                      }
                    >
                      Completed
                    </li>
                  </ul>
                </div>
              </div>
              <button
                className={`${styles.button} ${styles.delete_button}`}
                onClick={multipleDeleteHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtectedLayout;
