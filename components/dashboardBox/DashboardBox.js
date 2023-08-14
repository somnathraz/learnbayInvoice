import React, { useState, useEffect } from "react";
import styles from "./dashboardBox.module.css";
import { BsThreeDots, BsLayers } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PopupUpdateFrom from "../PaymentForm/PopupUpdateForm";
// import moment from "moment";

const DashboardBox = ({ popupData }) => {
  const [show, setShow] = useState(popupData);
  const [updateForm, setUpdateForm] = useState({ show: false, id: "" });
  const deleteQuery = async (data) => {
    const response = await fetch("/api/Popup/generatePopup", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const msg = await response.json();
      alert(msg);
    }
    if (response.status === 409) {
      const { msg } = await response.json();
      alert(msg);
    }
  };
  const updateQuery = async (data) => {
    console.log(data);
    setUpdateForm({ ...show, show: true, id: data.id });
  };

  const handleChange = (id) => {
    setShow(
      show.map((data) => {
        if (data._id == id) {
          data.show = !data.show;
          // console.log(data._id);
        } else {
          data.show = false;
        }
        return data;
      })
    );
  };

  // console.log(updateForm);
  return (
    <div className={styles.boxes}>
      <div className={styles.headDiv}>
        <h3>All Popups</h3>{" "}
        {popupData.length >= 2 ? (
          <p className={styles.warning}>(Maximum Number of popup is live)</p>
        ) : (
          ""
        )}
      </div>

      <div className={styles.boxWrap}>
        {popupData.map((data, i) => {
          // const startDay = new Date(data.startDate).getDate();
          // const endDay = new Date(data.endDate).getDate();
          // const momentStartMonth = moment(new Date(data.startDate)).format(
          //   "MMM"
          // );
          // const momentEndMonth = moment(new Date(data.endDate)).format("MMM");

          // const momentStartTime = moment(new Date(data.startDate)).format(
          //   "h:mm a"
          // );
          // const momentEndTime = moment(new Date(data.endDate)).format("h:mm a");
          // const displayStartDate =
          //   momentStartMonth + " " + startDay + " - " + momentStartTime;

          // const displayEndDate =
          //   momentEndMonth + " " + endDay + " - " + momentEndTime;

          return (
            <div className={styles.box} key={i}>
              <div className={styles.head}>
                <BsLayers className={styles.layers} />
                <div
                  className={styles.MenuWrap}
                  onMouseEnter={() => handleChange(data._id)}
                  onMouseLeave={() => handleChange(data._id)}
                  onClick={() => handleChange(data._id)}
                >
                  {show[i].show ? (
                    <div className={styles.dropMenu}>
                      <FiEdit
                        className={styles.menuIcon}
                        onClick={() => updateQuery(data)}
                      />
                      <AiOutlineDelete
                        className={styles.menuIcon}
                        onClick={() => deleteQuery(data)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <BsThreeDots
                    className={styles.mIcon}
                    onClick={() => setShow(!show)}
                  />
                </div>
              </div>

              <div className={styles.bodyBox}>
                <p>Id:{data.id}</p>
                <h4>{data.heading}</h4>
                <p>{data.para1}</p>
                <p>{data.para2}</p>
              </div>
            </div>
          );
        })}
      </div>
      {updateForm.show ? (
        <div className={styles.popup}>
          <div className={styles.innerPopup}>
            <AiOutlineCloseCircle
              className={styles.close}
              onClick={() => setUpdateForm({ ...updateForm, show: false })}
            />
            <h4>Update Popup</h4>
            <PopupUpdateFrom id={updateForm.id} setUpdateForm={setUpdateForm} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashboardBox;
