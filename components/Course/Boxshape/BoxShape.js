/* eslint-disable @next/next/no-img-element */
import React from "react";

import styles from "./BoxShape.module.css";
import Image from "next/image";
import Form from "../../Form/Form";

const BoxShape = ({
  title,
  Box1h5,
  box1desc,
  Box2h5,
  box2desc,
  Box3h5,
  box3desc,
  Box4h5,
  box4desc,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
  dataScience,
}) => {
  return (
    <div className={styles.boxWrapper}>
      <p className="pTop">Key Program Features</p>
      <h2>{title}</h2>
      <div className={styles.BoxDiv}>
        <div className={styles.left}>
          <div className={styles.box}>
            <div className={styles.ImgB}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Real work experience-06.svg"
                alt="Real work Experience"
                className={styles.icon}
                width="40"
                height="40"
                layout="intrinsic"
                loading="lazy"
              />
            </div>

            <h5>{Box1h5}</h5>
            <p>{box1desc}</p>
          </div>
          <div className={styles.box}>
            <div className={styles.ImgC}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/byoc-icon.svg"
                alt="Build your own course"
                className={styles.icon}
                width="35"
                height="35"
                layout="intrinsic"
                loading="lazy"
              />
            </div>
            <h5>{Box2h5}</h5>
            <p>{box2desc}</p>
          </div>
          <div className={styles.box}>
            <div className={styles.ImgC}>
              <img
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/job-guarantee.svg"
                alt="Job Guarantee"
                className={styles.icon}
                width="35"
                height="35"
                loading="lazy"
              />
            </div>
            <h5>{Box3h5}</h5>
            <p>{box3desc}</p>
          </div>
          <div className={styles.box}>
            <div className={styles.ImgC}>
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/eligibilty-criteria.svg"
                alt="Eligibility Criteria"
                className={styles.icon}
                width="35"
                height="35"
                layout="intrinsic"
                loading="lazy"
              />
            </div>
            <h5>{Box4h5}</h5>
            <p>{box4desc}</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.imgBack}>
            <div className={styles.formWrapper}>
              <h5>
                Land In Your Dream Job With <br />
                <span>Real Work Experience</span>
              </h5>
              <Form
                dataScience={dataScience}
                redirectDs={redirectDs}
                redirectFs={redirectFs}
                redirectBa={redirectBa}
                redirectBl={redirectBl}
                redirectDe={redirectDe}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxShape;
