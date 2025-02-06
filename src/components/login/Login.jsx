import * as React from "react";
import styles from "./Login.module.scss";
import { Icon } from "@iconify/react";

export default function Login() {
  return (
    <section className={styles.section_login}>
      <div className={styles.row}>
        <div className={styles.col_1_of_2}>
          <div className={styles.container_login}>
            <div className={styles.container_login_1}>
              <img src="assets/icon.png" />
              <p>
                Streamline your workflow and track progress effortlessly with
                our all-in-one task management app.
              </p>
              <button className={styles.login_button}>
                <Icon icon="flat-color-icons:google" width="20" height="20" />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
        <div className={styles.col_1_of_2}>
          <div className={styles.container}>
            <img
              src="assets/taskBuddyLoginImage.png"
              className={styles.container_login_image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
