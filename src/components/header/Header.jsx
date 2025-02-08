import React from "react";
import { useAuth } from "../../context/useAuth";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userLogoutHandler = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className={styles.nav_navbar}>
      <img src="assets/icon.png" className={styles.logo} />
      <div className={styles.user_img_name_container}>
        <img src={user.picture} className={styles.user_profile_pic} />
        <p className={styles.user_name}>{user.given_name}</p>
        <div className={styles.user_setting_card}>
          <ul>
            <li>
              {user.given_name}{" "}{user.family_name}
            </li>
            <li>
              <button
                className={styles.user_logout_button}
                onClick={userLogoutHandler}
              >
                <Icon icon="tabler:logout-2" width="24" height="24" />
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
