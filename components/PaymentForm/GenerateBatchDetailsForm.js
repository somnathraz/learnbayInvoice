import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import BatchDateBox from "../BatchDateBox/BatchDateBox";

const BatchDateForm = ({ id, setUpdateForm }) => {
  const [passBatchData, setPassBatchData] = useState("");
  const [display, setDisplay] = useState(true);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    daysInfo: "",
    dateInfo: "",
    timeInfo: "",
  });

  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
//get batch Details from api
useEffect(() => {
  console.log("inside useEffect");
  const fetchBatchDetails = async () => {
    const data = await fetch("/api/BatchDetails/getBatchDetails", {
      method: "GET",
    });
    if (data.status === 200) {
      const { batchDatesDetails } = await data.json();
      setPassBatchData(batchDatesDetails);
      console.log(batchDatesDetails);
    }
  };
  fetchBatchDetails();
}, []);
  // Form Submit function

  const formSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await fetch("/api/BatchDetails/getBatchDetails", {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.status === 200) {
        setQuery({
          daysInfo: "",
          dateInfo: "",
          timeInfo: "",
        });
        setStartDate("");
        setStartTime("");
        setEndTime("");
        alert("batch added");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.App}>
      <form
        onSubmit={formSubmit}
      >
        <div className={styles.formWrapper}>
          <textarea
            type="text"
            name="daysInfo"
            placeholder="Weekday Evening (Mon-Fri)"
            className={styles.EmailInput}
            value={query.daysInfo}
            required
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <textarea
            type="text"
            name="dateInfo"
            required
            placeholder="11th August 2023"
            className={styles.EmailInput}
            value={query.dateInfo}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <textarea
            type="text"
            name="timeInfo"
            required
            placeholder="8 PM to 10 PM"
            className={styles.EmailInput}
            value={query.timeInfo}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <label>Select courses You want to display Batch</label>
          <div className={styles.checkBoxDiv}>
            <input
              type="radio"
              name="page"
              value="Data Science and AI"
              id="flexCheckDefault"
              onChange={handleParam()}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Data Science and AI
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="radio"
              name="page"
              value="Software Development"
              id="flexCheckDefault"
              onChange={handleParam()}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Software Development
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="radio"
              name="page"
              value="Business Analytics Family"
              id="flexCheckDefault"
              onChange={handleParam()}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Business Analytics Family
            </label>
          </div>
        </div>

        {loading ? (
          <div className="center">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        ) : (
          <button type="submit" className={styles.button}>
            Submit
          </button>
        )}
      </form>

      {display ? (
        passBatchData === "" ? (
          ""
        ) : (
          <div>
            <BatchDateBox PassBatchData={passBatchData} />
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default BatchDateForm;
