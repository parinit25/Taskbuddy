import React from "react";
import { useAuth } from "../../context/useAuth";
import styles from "./Header.module.scss";

const Header = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <nav className={styles.nav_navbar}>
      <img src="assets/icon.png" className={styles.logo} />
      <div className={styles.user_img_name_container}>
        <img src={user.picture} className={styles.user_profile_pic} />
        <p className={styles.user_name}>{user.given_name}</p>
      </div>
    </nav>
  );
};

export default Header;
