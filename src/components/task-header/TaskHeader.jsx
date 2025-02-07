import React from "react";
import styles from "./TaskHeader.module.scss";

const TaskHeader = () => {
  return (
    <div className={styles.task_header_container}>
      <div className={styles.filter_container}>
        <p className={styles.filter_by_text}>Filter by</p>
        <select
          className={styles.custom_select}
          title="Category"
          defaultValue="Category"
        >
          <option disabled>Category</option>
          <option>Work</option>
          <option>Personal</option>
        </select>
        <select className={styles.custom_select}>
          <option>Due date</option>
          <option>Old to New</option>
          <option>new to old</option>
        </select>
      </div>
      <div className={styles.search_add_task_container}>
        <input className={styles.search_box} placeholder="search" />
        <button className={styles.primary_button}>Add Task</button>
      </div>
    </div>
  );
};

export default TaskHeader;
