import React, { useState } from "react";
import styles from "./Login.module.scss";
import Modal from "../../components/Modal/Modal";
import UserIcon from "../../assets/icons/iconUser.svg";
import PasswordIcon from "../../assets/icons/iconPassword.svg";
import LL from "../../translations";
import { login } from "../../api/login/login.api";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async () => {
    if (userName === "" || password === "") {
      setErrorMessage(LL.errorMsgLogin1);
      setShowAlert(true);
      return;
    }

    try {
      const response = await login({ username: userName, password });

      if (response.status === 200) {
        const data = response.data;
        const { token, role, team, redirectUrl } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("team", team);

        window.location.href = redirectUrl;
      } else {
        setErrorMessage(LL.errorMsgLogin2);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Hiba történt a bejelentkezés során: ", error);
      setErrorMessage(LL.errorMsg3);
      setShowAlert(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>{LL.login}</div>
      <div className={styles.formContainer}>
        {showAlert && (
          <Modal open={showAlert} onClose={() => setShowAlert(false)}>
            {errorMessage}
          </Modal>
        )}
        <div className={styles.line}>
          <img src={UserIcon} />
          <input
            className={styles.input}
            type="text"
            placeholder={LL.username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles.line}>
          <img src={PasswordIcon} />
          <input
            className={styles.input}
            type="password"
            placeholder={LL.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.line}>
          <button className={styles.button} onClick={handleLogin}>
            {LL.login2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
