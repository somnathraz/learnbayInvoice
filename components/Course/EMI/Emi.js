import React from "react";
import styles from "./Emi.module.css";
import { GiReceiveMoney } from "react-icons/gi";

const Emi = () => {
  return (
    <div className={styles.EmiWrapper}>
      <div className={styles.leftEmi}>
        <h6>Why choose our Data science course?</h6>
        <span>350+ Hours of Live class</span>
        <span>15+ Industry Project</span>
        <span>100% Job Guarantee</span>
        <span>Real Work Experience</span>
        <span>Learn From Industry Experts</span>
        <span>Life Time Accessability</span>
      </div>
      <div className={styles.rightEmi}>
        <h5 className={styles.EmiHeading}>Program Fees</h5>
        <div className={styles.top}>
          <div className={styles.topEmiLeft}>
            <h5>Starting at ₹ 5801/month</h5>
            <p>program fee starting from: ₹59,000 + GST </p>
          </div>
          <div className={styles.topEmiRight}>
            <button>Apply Now</button>
          </div>
        </div>
        <div className={styles.emiMiddle}>
          <div className={styles.emiLeftMiddle}>
            <div className={styles.emiMiddleHead}>
              <span>
                <GiReceiveMoney className="bIcon" /> Low cost EMI
              </span>
              <span>
                <p>Recommended</p>
              </span>
            </div>
            <div className={styles.emiMiddleBody}>
              <p>Starting from </p>
            </div>
          </div>
          <div className={styles.emiRightMiddle}></div>
        </div>
      </div>
    </div>
  );
};

export default Emi;
