import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ToolsCovered.module.css";

function ToolsCovered() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
  }, [mobile]);
  return (
    <section className={styles.ToolsCovered}>
      <h4>Tools Covered</h4>
      <div>
        {mobile ? (
          <Image
            src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Tools_Covered_ Mobile.webp"
            alt="Skillslash"
            quality={100}
            objectFit="contain"
            width="480"
            height="120px"
            loading="lazy"
          />
        ) : (
          <Image
            src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Tools_Covered.webp"
            alt="Skillslash"
            quality={100}
            objectFit="contain"
            width="1400"
            height="60px"
            loading="lazy"
          />
        )}
      </div>
    </section>
  );
}

export default ToolsCovered;
