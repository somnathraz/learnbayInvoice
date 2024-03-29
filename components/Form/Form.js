import React, { useState, useEffect } from "react";
import styles from "./Form.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/router";
import { BsArrowRightCircleFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import getDay from "date-fns/getDay";

const Form = ({
  popup,
  setTrigger,
  downloadBrochure,
  event,
  dataScience,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
}) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState();
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  //offset to maintain time zone difference

  const [value, setValue] = useState();
  const [query, setQuery] = useState({
    name: "",
    email: "",
    phone: "",
    workExperience: "",
    dateTime: "",
    url: router.asPath,
  });
  useEffect(() => {
    setQuery({ ...query, phone: value, dateTime: startDate });
  }, [value, startDate]);

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let endPoint = "https://getform.io/f/f52ff3a0-cf37-4e7e-9bb7-27786de78fd7";

  // Form Submit function
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    fetch(`${endPoint}`, {
      method: "POST",
      body: formData,
    }).then(() =>
      setQuery({
        name: "",
        email: "",
        phone: "",
        workExperience: "",
        dateTime: "",
        url: "",
      })
    );
    if (popup) {
      const off = () => {
        setTrigger(false);
      };
      off();
    }

    if (dataScience) {
      router.push("/Thankyou/data-science");
      console.log(dataScience);
    }
    if (redirectDs) {
      router.push("/Thankyou/data-science");
      console.log(redirectDs);
    }
    if (redirectFs) {
      router.push("/Thankyou/full-stack");
      console.log(redirectFs, "Inside redirect");
    }
    if (redirectDe) {
      router.push("/Thankyou/data-engineering");
    }
    if (redirectBa) {
      router.push("/Thankyou/business-analytics");
      return;
    }
    if (redirectBl) {
      router.push("/Thankyou/blockchain");
      return;
    }
  };
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0;
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  let btnText = "Apply Now";
  if (event) {
    btnText = "Register Now";
  }
  return (
    <div className={styles.App}>
      <form onSubmit={formSubmit}>
        <div
          className={styles.formWrapper}
          style={event ? { width: "100%" } : { width: "80%" }}
        >
          <input
            type="text"
            name="name"
            className={popup ? styles.NameInputs : styles.NameInput}
            required
            placeholder="Enter your Full Name*"
            value={query.name}
            style={{ borderBottom: "1px solid grey" }}
            onChange={handleParam()}
          />
        </div>
        <div
          className={styles.formWrapper}
          style={event ? { width: "100%" } : { width: "80%" }}
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter Your Email*"
            className={popup ? styles.EmailInputs : styles.EmailInput}
            value={query.email}
            onChange={handleParam()}
          />
        </div>
        <div
          className={styles.formWrapper}
          style={event ? { width: "100%" } : { width: "80%" }}
        >
          <PhoneInput
            style={
              popup
                ? {
                    height: "50px",
                    borderRadius: "8px",
                    border: "1px solid grey",
                    padding: "10px",
                  }
                : {
                    border: "0",
                    height: "50px",
                    borderRadius: "3px",
                    borderBottom: "1px solid grey",
                  }
            }
            name="phone"
            rules={{ required: true }}
            defaultCountry="IN"
            placeholder="Enter Phone Number*"
            className={popup ? styles.Phones : styles.Phone}
            value={value}
            required
            onChange={setValue}
          />
        </div>
        <div
          className={popup ? styles.formWrappers : styles.formWrapper}
          style={event ? { width: "100%" } : { width: "80%" }}
        >
          <select
            name="workExperience"
            required
            value={query.workExperience}
            onChange={handleParam()}
          >
            <option className={styles.option} value="">
              Select Your Work Experience*
            </option>
            {event ? (
              ""
            ) : (
              <option value="College Students">College Students</option>
            )}

            <option value="Fresher ( less than 1 year)">
              Fresher ( less than 1 year)
            </option>
            <option value="1 to 3 year">1 to 3 year</option>
            <option value="3 to 7 year">3 to 7 year</option>
            <option value="7 to 12 year">7 to 12 year</option>
            <option value="12+ year">12+ year</option>
          </select>
        </div>
        <input type="hidden" id="url" name="url" value={router.asPath}></input>
        {downloadBrochure ? (
          ""
        ) : (
          <div className={popup ? styles.formWrappers : styles.formWrapper}>
            <div className={styles.inner}>
              <DatePicker
                selected={startDate}
                name="dateTime"
                id="dateTime"
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeIntervals={15}
                includeDateIntervals={[
                  {
                    start: subDays(new Date(), 1),
                    end: addDays(new Date(), 5),
                  },
                ]}
                filterDate={isWeekday}
                filterTime={filterPassedTime}
                wrapperClassName={styles.date}
                className={styles.datePicker}
                placeholderText="Select Date and Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                required
                minTime={setHours(setMinutes(new Date(), 0), 10)}
                maxTime={setHours(setMinutes(new Date(), 0), 20)}
              />
            </div>
          </div>
        )}

        <p className={styles.FormText} style={{ fontSize: "10px" }}>
          By submitting the form, you agree to our Terms and Conditions and our
          Privacy Policy.
        </p>
        <button type="submit" className={styles.button}>
          {downloadBrochure ? "Download Now" : btnText}{" "}
          <BsArrowRightCircleFill />
        </button>
      </form>
    </div>
  );
};

export default Form;
