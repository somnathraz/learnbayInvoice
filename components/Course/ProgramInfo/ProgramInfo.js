import styles from "./ProgramInfo.module.css";
import React from "react";

const ProgramInfo = ({ BatchDate, BatchDuration, Placement }) => {
  return (
    <div className={styles.feature}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>Next Cohort starts</p>
          <h5>{BatchDate}</h5>
        </div>
        <div className={styles.middle}>
          <p>Program Duration</p>
          <h5>{BatchDuration}</h5>
        </div>
        <div className={styles.right}>
          <p>Placement Guarantee</p>
          <h5>{Placement}</h5>
        </div>
      </div>
    </div>
  );
};

export default ProgramInfo;
