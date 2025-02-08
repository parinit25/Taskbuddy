import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import { useTasks } from "../../../context/TaskContext";
import styles from "./TableTodo.module.scss";
import { Icon } from "@iconify/react";

const TableTodo = () => {
  const { tasks, addTodoHandler } = useTasks();
  const todoTasks = tasks.filter((item) => item.status === "Todo");
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [taskButtonActive, setTaskButtonActive] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [todo, setTodo] = useState({
    id: null,
    title: "",
    description: "",
    dueDate: "",
    status: "",
    category: "",
  });

  // Toggle Accordion
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Toggle Add Task Form
  const addTaskButtonHandler = () => {
    setTaskButtonActive(!taskButtonActive);
  };

  const submitHandler = () => {
    let hasError = false;
    if (!todo.status || todo.status === "Select Status") {
      setStatusError(true);
      hasError = true;
    } else {
      setStatusError(false);
    }
    if (!todo.category || todo.category === "Select Category") {
      setCategoryError(true);
      hasError = true;
    } else {
      setCategoryError(false);
    }
    if (hasError) return;
    addTodoHandler(todo);
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
                    <tr className={styles.add_form_row}>
                      <td>
                        <input
                          type="text"
                          placeholder="Task Title"
                          onChange={(e) => {
                            setTodo({ ...todo, title: e.target.value });
                          }}
                          value={todo.title}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          onChange={(e) => {
                            setTodo({ ...todo, dueDate: e.target.value });
                          }}
                        />
                      </td>
                      <td>
                        <FormControl fullWidth error={statusError}>
                          <select
                            value={todo.status || "Select Status"}
                            onChange={(e) => {
                              setTodo({
                                ...todo,
                                status: e.target.value,
                              });
                            }}
                            inputProps={{
                              name: "status",
                              id: "status-select",
                            }}
                          >
                            <option value="Select Status" disabled>
                              Status
                            </option>
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                          {statusError && (
                            <FormHelperText>
                              Please select a valid status.
                            </FormHelperText>
                          )}
                        </FormControl>
                      </td>
                      <td>
                        <FormControl fullWidth error={categoryError}>
                          <select
                            value={todo.category || "Select Category"}
                            onChange={(e) => {
                              setTodo({
                                ...todo,
                                category: e.target.value,
                              });
                            }}
                            defaultValue={"Work"}
                            inputProps={{
                              name: "category",
                              id: "uncontrolled-native",
                            }}
                          >
                            <option value="Select Category" disabled>
                              Category
                            </option>
                            <option value={"Work"}>Work</option>
                            <option value={"Personal"}>Personal</option>
                          </select>
                          {categoryError && (
                            <FormHelperText>
                              Please select a valid category.
                            </FormHelperText>
                          )}
                        </FormControl>
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="4" className={styles.task_form_buttons}>
                        <button
                          type="submit"
                          className={styles.primary_button}
                          onClick={submitHandler}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={addTaskButtonHandler}
                          className={styles.cancel_button}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

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
                  {todoTasks?.length > 0 ? (
                    todoTasks
                      ?.filter((item) => item.status === "Todo")
                      .map((task, index) => (
                        <tr key={index}>
                          {/* <td className={styles.task_checkbox}></td> */}
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
                      No tasks in Todo
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

export default TableTodo;
