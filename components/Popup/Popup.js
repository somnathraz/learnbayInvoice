import React, { useState, useEffect } from "react";
import styles from "./Popup.module.css";
import { AiFillCloseCircle } from "react-icons/ai";

const Popup = ({ link, title, p1, p2 }) => {
  const [open, setOpen] = useState(false);
  const handelOpen = () => {
    setOpen(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 5000);
    return;
  }, []);

  return (
    <div className={open ? styles.Popup : styles.hide}>
      <AiFillCloseCircle className={styles.Icon} onClick={handelOpen} />
      <div className={styles.contentPopup}>
        <h5>{title}</h5>
        <h6>Available Batch Details :</h6>
        <ul>
          <li>
            {" "}
            <p>{p1}</p>
          </li>
          <li>
            {" "}
            <p>{p2}</p>
          </li>
        </ul>
        <p className={styles.faded}>** Terms & Conditions applied.</p>
        <button onClick={handelOpen}>
          <a href={link}>Apply For Scholarship Now!</a>
        </button>
      </div>
    </div>
  );
};

export default Popup;
