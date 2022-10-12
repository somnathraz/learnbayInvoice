import React, { useState } from "react";
import styles from "./BannerCTA.module.css";
import { IoCallOutline } from "react-icons/io5";
import Popup from "../../Popup/Popup";
import Form from "../../Form/Form";

function BannerCTA({
  dataScience,
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
    <section className={styles.BannerCTA}>
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
      <div>
        <p className={styles.PText}>
          Got Questions regarding next cohort date?
        </p>
      </div>
      <div>
        <button className={styles.bIcons} onClick={popupShow}>
          <IoCallOutline />
          Talk to an admission counselor
        </button>
      </div>
    </section>
  );
}

export default BannerCTA;
