import React, { useState } from "react";
import styles from "./RealWork.module.css";
import { BsFillCheckCircleFill, BsFillPlayFill } from "react-icons/bs";
import Image from "next/image";
import Popup from "../../Popup/Popup";
import Form from "../../Form/Form";
import VideoPopup from "../../VideoPopup/VideoPopup";
import { FiPhone } from "react-icons/fi";

const RealWork = ({
  desc,
  dataScience,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
}) => {
  const [popups, setPopups] = useState(false);
  const [video, setVideo] = useState(false);
  const videoSHow = () => {
    setVideo(true);
  };

  const popupShow = () => {
    setPopups(true);
  };
  return (
    <div className={styles.realWrapper}>
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
      <VideoPopup triggers={video} setTriggers={setVideo} ids="9401Q9vFxOY" />
      <div className={styles.left}>
        <p className="pTop">Learn and Work</p>
        <h4>Why Real Work Experience?</h4>
        <p className="pBotS">{desc}</p>
        <span>
          <BsFillCheckCircleFill
            className="bIcon"
            style={{ fontSize: "14px" }}
          />
          <div className={styles.pWrapper}>
            <b>Implement</b> what you learn.
          </div>
        </span>

        <span>
          <BsFillCheckCircleFill
            className="bIcon"
            style={{ fontSize: "14px" }}
          />
          <div className={styles.pWrapper}>
            <b>Get</b> ready as per the industry level.
          </div>
        </span>
        <span>
          <BsFillCheckCircleFill
            className="bIcon"
            style={{ fontSize: "14px" }}
          />
          <div className={styles.pWrapper}>
            <b>Learn</b> the skills that companies want.
          </div>
        </span>
        <div className={styles.btnWrappper}>
          <button className={styles.button} onClick={popupShow}>
            <FiPhone className={styles.btnIcon} /> Talk To Expert
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <Image
          src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Real-work-experiences.webp"
          layout="intrinsic"
          alt="Real work experience"
          width="1110"
          height="650"
          loading="lazy"
        />
        <div className={styles.vBlur}>
          <BsFillPlayFill className={styles.vIcon} onClick={videoSHow} />
        </div>
      </div>
    </div>
  );
};

export default RealWork;
