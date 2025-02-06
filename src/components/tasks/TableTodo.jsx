import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import React, { useState } from "react";
import styles from "./TableTodo.module.scss";

const TableTodo = ({ view, tasks, addTaskHandler }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [taskButtonActive, setTaskButtonActive] = useState(false);
  const [todo, setTodo] = useState({
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

  const addTodoHandler = () => {
    addTaskHandler(todo);
  };

  return (
    <section className={styles.section_table_todo}>
      <div className={styles.list_view}>
        <div className={styles.accordion}>
          <div className={styles.accordion_header} onClick={toggleAccordion}>
            <span>Todo ({tasks.length})</span>
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
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          placeholder="Task Title"
                          onChange={(e) => {
                            setTodo({ ...todo, title: e.target.value });
                          }}
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
                        <FormControl fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Status
                          </InputLabel>
                          <NativeSelect
                            defaultValue={"Todo"}
                            inputProps={{
                              name: "status",
                              id: "uncontrolled-native",
                            }}
                            onChange={(e) => {
                              setTodo({ ...todo, status: e.target.value });
                            }}
                          >
                            <option value={"Todo"}>Todo</option>
                            <option value={"In Progress"}>In progress</option>
                            <option value={"Completed"}>Completed</option>
                          </NativeSelect>
                        </FormControl>
                      </td>
                      <td>
                        <FormControl fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Category
                          </InputLabel>
                          <NativeSelect
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
                            <option value={"Work"}>Work</option>
                            <option value={"Personal"}>Personal</option>
                          </NativeSelect>
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4" className={styles.task_form_buttons}>
                        <button
                          type="submit"
                          className={styles.primary_button}
                          onClick={addTodoHandler}
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
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.title}</td>
                      <td>{task.dueDate}</td>
                      <td>{task.status}</td>
                      <td>{task.category}</td>
                    </tr>
                  ))}
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
