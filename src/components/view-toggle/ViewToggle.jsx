import React from "react";
import styles from "./ViewToggle.module.scss";
import { Icon } from "@iconify/react";

const ViewToggle = ({ view, setView }) => {
  return (
    <div className={styles.view_toggle}>
      <button
        onClick={() => setView("list")}
        className={view === "list" ? styles.active : styles.in_active}
      >
        <Icon
          icon="material-symbols-light:view-list-outline"
          width="24"
          height="24"
        />
        List
      </button>
      <button
        onClick={() => setView("board")}
        className={view === "board" ? styles.active : styles.in_active}
      >
        <Icon icon="iconoir:kanban-board" width="24" height="24" />
        Board
      </button>
    </div>
  );
};

export default ViewToggle;
