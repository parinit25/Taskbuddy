import { FormControl, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import styles from "./AddTaskForm.module.scss";
import { useTasks } from "../../../../context/TaskContext";

const AddTaskForm = ({ addTaskButtonHandler }) => {
  const { addTodoHandler } = useTasks();
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
                <FormHelperText>Please select a valid status.</FormHelperText>
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
                <FormHelperText>Please select a valid category.</FormHelperText>
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
  );
};

export default AddTaskForm;
