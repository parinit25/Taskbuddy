import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "./CreateTaskModal.module.scss";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Icon } from "@iconify/react";

const CreateTaskModal = ({ open, handleClose }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [errors, setErrors] = useState({});
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    due_date: "",
    status: "",
    attachment: null,
  });

  // Track mounted state to prevent setState on unmounted component
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (e) => {
    if (isMounted.current) {
      setTask({ ...task, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleEditorChange = (newState) => {
    if (isMounted.current) {
      setEditorState(newState);
      const rawText = convertToRaw(newState.getCurrentContent());
      setTask({ ...task, description: JSON.stringify(rawText) });
    }
  };

  const handleFileUpload = (e) => {
    if (isMounted.current) {
      setTask({ ...task, attachment: e.target.files[0] });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!task.title) newErrors.title = "Title is required";
    if (!task.due_date) newErrors.due_date = "Due date is required";
    if (!task.status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Task Submitted:", task);

      // Ensure component is mounted before closing the modal
      if (isMounted.current) {
        setTimeout(() => {
          handleClose();
        }, 0);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <div className={styles.dialog_title_container}>
        <p className={styles.dialog_title}>Create Task</p>
        <Icon
          className={styles.close_icon}
          icon="bitcoin-icons:cross-filled"
          onClick={handleClose}
          width="24"
          height="24"
        />
      </div>

      <DialogContent className={styles.dialog_content}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          className={styles.input_field}
          style={{ fontFamily: "Urbanist, sans-serif" }}
        />
        {errors.title && <p className={styles.error_text}>{errors.title}</p>}

        <div className={styles.editor_container}>
          {/* <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            placeholder="Task Description"
            toolbar={{
              options: ["inline", "textAlign"],
              inline: {
                options: ["bold", "italic", "underline", "strikethrough"],
              },
            }}
          /> */}
        </div>

        <div className={styles.category_container}>
          <div className={styles.task_category_container}>
            <label className={styles.task_label}>Task Category</label>
            <div className={styles.category_button_container}>
              <button
                className={`${styles.category_button} ${
                  task.category === "Work" ? styles.active : ""
                }`}
                onClick={() => setTask({ ...task, category: "Work" })}
              >
                Work
              </button>
              <button
                className={`${styles.category_button} ${
                  task.category === "Personal" ? styles.active : ""
                }`}
                onClick={() => setTask({ ...task, category: "Personal" })}
              >
                Personal
              </button>
            </div>
          </div>

          <div className={styles.task_category_container}>
            <label className={styles.task_label}>Due Date</label>
            <input
              type="date"
              name="due_date"
              value={task.due_date}
              onChange={handleChange}
              className={styles.input_field}
              style={{ fontFamily: "Urbanist, sans-serif" }}
            />
            {errors.due_date && (
              <p className={styles.error_text}>{errors.due_date}</p>
            )}
          </div>

          <div className={styles.task_category_container}>
            <label className={styles.task_label}>Task Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className={styles.select_field}
              style={{ fontFamily: "Urbanist, sans-serif" }}
            >
              <option value="" disabled>
                Choose
              </option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && (
              <p className={styles.error_text}>{errors.status}</p>
            )}
          </div>
        </div>

        <div className={styles.attachment}>
          <input
            type="file"
            id="attachment"
            hidden
            onChange={handleFileUpload}
          />
          <label htmlFor="attachment" className={styles.file_label}>
            {task.attachment
              ? task.attachment.name
              : "Drop your files here or Update"}
          </label>
        </div>
      </DialogContent>

      <div className={styles.dialog_actions}>
        <button onClick={handleClose} className={styles.cancel_button}>
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className={styles.primary_button}
          disabled={!task.title || !task.status || !task.due_date}
        >
          Create
        </button>
      </div>
    </Dialog>
  );
};

export default CreateTaskModal;
