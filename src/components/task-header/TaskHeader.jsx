import React, { useState } from "react";
import styles from "./TaskHeader.module.scss";
import CreateTaskModal from "../tasks/create-task-modal/CreateTaskModal";
import { useTasks } from "../../context/TaskContext";

const TaskHeader = () => {
  const [open, setOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useTasks();
  const { filter, setFilter } = useTasks();

  const changeFilterHandler = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.task_header_container}>
      <div className={styles.filter_container}>
        <p className={styles.filter_by_text}>Filter by</p>
        <select
          name="category"
          className={styles.custom_select}
          title="Category"
          value={filter.category}
          onChange={changeFilterHandler}
        >
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <select
          name="dueDate"
          className={styles.custom_select}
          value={filter.dueDate}
          onChange={changeFilterHandler}
        >
          <option value="">All Dates</option>
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
        </select>
      </div>
      <div className={styles.search_add_task_container}>
        <input
          className={styles.search_box}
          value={searchQuery}
          placeholder="search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.primary_button} onClick={() => setOpen(true)}>
          Add Task
        </button>
        <CreateTaskModal open={open} handleClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default TaskHeader;
