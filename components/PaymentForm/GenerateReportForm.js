import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";

const GenerateReportForm = ({ email }) => {
  //offset to maintain time zone difference

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState();
  const [query, setQuery] = useState({
    startDate: startDate,
    endDate: endDate,
  });

  useEffect(() => {
    setQuery({
      ...query,
      startDate: startDate,
      endDate: endDate,
    });
  }, [startDate, endDate]);
  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Form Submit function

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetch("/api/Invoice/MonthlyReport", {
        method: "POST",
        body: JSON.stringify({
          startDate: query.startDate.toLocaleDateString("en-US"),
          endDate: query.endDate.toLocaleDateString("en-US"),
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.status === 200) {
        console.log(data);
      }

      setQuery({ startDate: "", endDate: "" });

      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  let btnText = "Generate Monthly Report";

  return (
    <div className={styles.App}>
      <form onSubmit={formSubmit}>
        <div className={styles.inner} style={{ marginBottom: "10px" }}>
          <DatePicker
            selected={startDate}
            name="startDate"
            id="dateTime"
            onChange={(date) => {
              setStartDate(date);
            }}
            minDate={new Date("01-10-2022")}
            maxDate={new Date()}
            wrapperClassName={styles.date}
            className={styles.datePicker}
            placeholderText="Enter the first date"
            dateFormat="MMMM d, yyyy"
            required
          />
        </div>
        <div className={styles.inner} style={{ marginBottom: "10px" }}>
          <DatePicker
            selected={endDate}
            name="endDate"
            id="dateTime"
            onChange={(date) => {
              setEndDate(date);
            }}
            minDate={new Date(2022, 9, 1)}
            maxDate={new Date()}
            wrapperClassName={styles.date}
            className={styles.datePicker}
            placeholderText="Enter the last date"
            dateFormat="MMMM d, yyyy"
            required
          />
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
            {btnText}
          </button>
        )}
      </form>
    </div>
  );
};

export default GenerateReportForm;
