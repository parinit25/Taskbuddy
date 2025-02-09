import React, { useState } from "react";
import { useTasks } from "../../../../context/TaskContext";
import ListComponent from "../components/ListComponent";
import styles from "./TableTodo.module.scss";
import AddTaskForm from "../components/AddTaskForm";

const TableTodo = () => {
  const { tasks, addTodoHandler, deleteTaskHandler } = useTasks();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [taskButtonActive, setTaskButtonActive] = useState(false);

  const todoTasks = tasks?.filter((item) => item.status === "Todo");

  // Toggle Accordion
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  const deleteTaskHandlerAction = (key) => {
    deleteTaskHandler(key);
  };

  // Toggle Add Task Form
  const addTaskButtonHandler = () => {
    setTaskButtonActive(!taskButtonActive);
  };

  return (
    <section className={styles.section_table_todo}>
      <div className={styles.list_view}>
        <div className={styles.accordion}>
          <div className={styles.accordion_header} onClick={toggleAccordion}>
            <span>Todo ({todoTasks?.length})</span>
            <button>{isAccordionOpen ? "▲" : "▼"}</button>
          </div>

          {isAccordionOpen && (
            <div className={styles.accordion_content}>
              <button
                className={styles.add_task_button}
                onClick={addTaskButtonHandler}
              >
                + Add Task
              </button>
              {taskButtonActive && (
                <AddTaskForm addTaskButtonHandler={addTaskButtonHandler} />
              )}
              <ListComponent tasks={todoTasks} title="Todo"/>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TableTodo;
