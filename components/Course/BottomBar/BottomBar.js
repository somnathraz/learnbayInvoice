import React, { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/dist/client/link";
import Popup from "../../Popup/Popup";
import Form from "../../Form/Form";

const BottomBar = ({ changeBottom }) => {
  const [popups, setPopups] = useState(false);

  const popupShow = () => {
    setPopups(true);
  };
  return (
    <div className="divWrapper">
      <Popup
        trigger={popups}
        setTrigger={setPopups}
        className="popupModal"
        downloadBrochure
      >
        <div className="leftPopup">
          <div
            className="whiteP"
            style={{ width: "350px", height: "400px" }}
          ></div>
        </div>
        <div className="RightPopup">
          <h5>
            {changeBottom
              ? "Download Data science course Brochure"
              : "Download Full stack Brochure"}
          </h5>
          <p>Please enter the following details to initiate your download</p>
          <Form setTrigger={setPopups} downloadBrochure />
        </div>
      </Popup>
      <div className="FlDiv">
        <div className="flDivLeft" onClick={popupShow}>
          <BiDownload className="bIcon" />
          Download Brochure
        </div>
        <div className="flDivRight">
          <IoLogoWhatsapp className="bIcon" style={{ color: "Green" }} />
          <Link href="https://api.whatsapp.com/send?phone=918391911911&text=Hi%20Skillslash">
            Chat with us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
