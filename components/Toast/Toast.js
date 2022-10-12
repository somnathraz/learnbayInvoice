import React, { useState, useEffect } from "react";
import styles from "./Toast.module.css";
import {
  AiFillCheckCircle,
  AiOutlineClose,
  AiFillCloseCircle,
} from "react-icons/ai";
const Toast = ({ content, success, shows }) => {
  const [show, setShow] = useState(shows);
  console.log(success, content, shows);
  const [redirectSeconds, setRedirectSeconds] = useState(4);
  useEffect(() => {
    const time = setTimeout(() => {
      const interval = setInterval(() => {
        console.log(redirectSeconds);
        if (redirectSeconds > 0) {
          setRedirectSeconds(redirectSeconds - 1);
        } else {
          setShow(!shows);
        }
      }, 1000);
      clearInterval(interval);
    }, 1000);

    clearTimeout(time);
  }, [redirectSeconds]);
  useEffect(() => {
    setShow(shows);
  }, [shows, success]);

  return show ? (
    <div className={styles.Toast}>
      <div className={success ? styles.toastInner : styles.toastInnerF}>
        <div className={success ? styles.IconBack : styles.IconBackF}>
          {success ? (
            <AiFillCheckCircle className={styles.icon} />
          ) : (
            <AiFillCloseCircle className={styles.iconF} />
          )}
        </div>
        <p>{content}</p>
        <AiOutlineClose
          className={styles.cross}
          onClick={() => setShow(!shows)}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default Toast;
