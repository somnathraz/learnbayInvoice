import React, { useState, useEffect } from "react";
import styles from "./ContactUsForm.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import getDay from "date-fns/getDay";

const ContactForm = ({ popup, setTrigger }) => {
  const router = useRouter();

  //offset to maintain time zone difference
  const [startDate, setStartDate] = useState();

  const [value, setValue] = useState();
  const [query, setQuery] = useState({
    name: "",
    email: "",
    phone: "",
    workExperience: "",
    selectCourse: "",
    dateTime: "",
    url: router.asPath,
  });

  useEffect(() => {
    setQuery({ ...query, phone: value, dateTime: startDate });
  }, [value, query, startDate]);

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let endPoint = "https://getform.io/f/24a1a4e6-8116-4614-818d-0bff28469fd0";

  // Form Submit function

  const formSubmit = (e) => {
    console.log(startDate);
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
        selectCourse: "",
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
    if (query.selectCourse === "Adv Data Science and AI (Basic/Pro/ProMax)")
      router.push("/Thankyou/data-science");
    if (query.selectCourse === "Full Stack Developer course with certification")
      router.push("/Thankyou/full-stack");
    if (
      query.selectCourse === "Data Engineering Course with Industry Experience"
    )
      router.push("/Thankyou/data-engineering");
    if (query.selectCourse === "Blockchain program and certification")
      router.push("/Thankyou/blockchain");
    if (query.selectCourse === "Business Analytics Program For Professionals")
      router.push("/Thankyou/business-analytics");
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0;
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  let btnText = "Submit";

  return (
    <div className={styles.App}>
      <form onSubmit={formSubmit}>
        <div className={styles.formWrapper}>
          <input
            type="text"
            name="name"
            className={styles.NameInput}
            required
            placeholder="Enter your Full Name*"
            value={query.name}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter Your Email*"
            className={styles.EmailInput}
            value={query.email}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <PhoneInput
            style={{
              border: "1px solid #0487d9",
              height: "45px",
              borderRadius: "10px",
              padding: "10px",
            }}
            name="phone"
            rules={{ required: true }}
            defaultCountry="IN"
            placeholder="Enter Phone Number*"
            className={styles.Phone}
            value={value}
            required
            onChange={setValue}
          />
        </div>
        <div className={styles.formWrapper}>
          <select
            name="selectCourse"
            required
            value={query.selectCourse}
            onChange={handleParam()}
            placeholder="Select a course*"
          >
            <option className={styles.option} value="">
              Select a course*
            </option>

            <option value="Adv Data Science and AI (Basic/Pro/ProMax)">
              Adv Data Science and AI (Basic/Pro/ProMax)
            </option>
            <option value="Full Stack Developer course with certification">
              Full Stack Developer course with certification
            </option>
            <option value="Data Engineering Course with Industry Experience">
              Data Engineering Course with Industry Experience
            </option>
            <option value="Blockchain program and certification">
              Blockchain program and certification
            </option>
            <option value="Business Analytics Program For Professionals">
              Business Analytics Program For Professionals
            </option>
          </select>
        </div>

        <div className={styles.formWrapper}>
          <select
            name="workExperience"
            required
            value={query.workExperience}
            onChange={handleParam()}
          >
            <option className={styles.option} value="">
              Select Your Work Experience*
            </option>

            <option value="College Students">College Students</option>

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
        <div className={styles.inner}>
          <DatePicker
            selected={startDate}
            name="dateTime"
            id="dateTime"
            onChange={(date) => {
              setStartDate(date);
            }}
            showTimeSelect
            timeIntervals={15}
            includeDateIntervals={[
              { start: subDays(new Date(), 1), end: addDays(new Date(), 5) },
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
        <p className={styles.FormText} style={{ fontSize: "10px" }}>
          By submitting the form, you agree to our Terms and Conditions and our
          Privacy Policy.
        </p>
        <button type="submit" className={styles.button}>
          {btnText}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
