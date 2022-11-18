import React, { useState } from "react";
import styles from "./BoxShape.module.css";
import Image from "next/image";
import { HomeBoxData } from "./BoxShapeData";
const BoxShape = () => {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div className={hover ? styles.box : styles.boxActive}>
        <div className={styles.imgBack}>
          <Image
            src={HomeBoxData[0].img}
            width="30"
            height="30"
            loading="lazy"
            alt="boxIcon"
          />
        </div>
        <h5>{HomeBoxData[0].title}</h5>
        <p>{HomeBoxData[0].desc}</p>
      </div>
      <div
        className={styles.box}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={styles.imgBack}>
          <Image
            src={HomeBoxData[1].img}
            width="30"
            height="30"
            loading="lazy"
            alt="Job-guarantee"
          />
        </div>
        <h5>{HomeBoxData[1].title}</h5>
        <p>{HomeBoxData[1].desc}</p>
      </div>
      <div
        className={styles.box}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={styles.imgBack}>
          <Image
            src={HomeBoxData[2].img}
            width="30"
            height="30"
            loading="lazy"
            alt="Live-classes"
          />
        </div>
        <h5>{HomeBoxData[2].title}</h5>
        <p>{HomeBoxData[2].desc}</p>
      </div>
    </>
  );
};

export default BoxShape;
