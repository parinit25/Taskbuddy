import * as React from "react";
import styles from "./Login.module.scss";
import { useAuth } from "../../context/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { Navigate, useLocation } from "react-router";

export default function Login() {
  const { login, user } = useAuth();
  const { pathname } = useLocation();

  const loginHandler = (res) => {
    login(res);
  };

  const handleError = (errorResponse) => {
    console.error("Google login error: ", errorResponse);
  };

  return (
    <>
      {pathname === "/login" && !user ? (
        <section className={styles.section_login}>
          <div className={styles.row}>
            <div className={styles.col_1_of_2}>
              <div className={styles.container_login}>
                <div className={styles.container_login_1}>
                  <img src="assets/icon.png" alt="TaskBuddy Icon" />
                  <p>
                    Streamline your workflow and track progress effortlessly
                    with our all-in-one task management app.
                  </p>
                  <GoogleLogin onSuccess={loginHandler} onError={handleError} />
                </div>
              </div>
            </div>
            <div className={styles.col_1_of_2}>
              <div className={styles.container}>
                <img
                  src="assets/taskBuddyLoginImage.png"
                  className={styles.container_login_image}
                  alt="TaskBuddy Login Image"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </>
  );
}
