import React, { useState } from "react";
import styles from "./Benefits.module.css";
import { IoCallOutline } from "react-icons/io5";
import Image from "next/image";
import Popup from "../../Popup/Popup";
import Form from "../../Form/Form";

function Benefits({
  desc,
  InterviewT,
  InterviewD,
  CertificateT,
  CertificateD,
  JobT,
  dataScience,
  JobD,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
}) {
  const [popups, setPopups] = useState(false);

  const popupShow = () => {
    setPopups(true);
  };
  return (
    <section className={styles.Benefits}>
      <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="leftPopup">
          <div className="whiteP" />
        </div>
        <div className="RightPopup">
          <h5>Apply For Counselling</h5>
          <p>Fill the below Details to get started</p>
          <Form
            popup={true}
            setTrigger={setPopups}
            dataScience={dataScience}
            redirectDs={redirectDs}
            redirectFs={redirectFs}
            redirectBa={redirectBa}
            redirectBl={redirectBl}
            redirectDe={redirectDe}
          />
        </div>
      </Popup>
      <div className={styles.BInnerLeft}>
        <p className="pTop">Learn with Mentors from top Tech Companies</p>
        <h4>The benefits of Skillslash</h4>
        <p className="pBotS">{desc}</p>
        <button onClick={popupShow}>
          <IoCallOutline className="bIcons" />
          Apply for Counselling
        </button>
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.leftS}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/certificate_color.svg"
              alt="Certification from startups"
              layout="intrinsic"
              objectFit="cover"
              className={styles.DIcon}
              width="70"
              height="70"
              loading="lazy"
            />
          </div>
          <div className={styles.rightS}>
            <h5>{InterviewT}</h5>
            <p>{InterviewD}</p>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.leftS}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/byoc-icons.svg"
              alt="Build Your Own course"
              layout="intrinsic"
              objectFit="cover"
              className={styles.DIcon}
              width="70"
              height="70"
            />
          </div>
          <div className={styles.rightS}>
            <h5>{CertificateT}</h5>
            <p>{CertificateD}</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.leftS}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/byop_green.svg"
              alt="Build your own project"
              layout="intrinsic"
              objectFit="cover"
              className={styles.DIcon}
              width="70"
              height="70"
              loading="lazy"
            />
          </div>
          <div className={styles.rightS}>
            <h5>{JobT}</h5>
            <p>{JobD}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;
