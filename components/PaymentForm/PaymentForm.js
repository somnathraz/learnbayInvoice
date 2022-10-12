import React, { useState, useEffect } from "react";
import styles from "../Form/Form.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { BsArrowRightCircleFill } from "react-icons/bs";

const PaymentForm = ({ popup, setDetails }) => {
  const [value, setValue] = useState();
  const [query, setQuery] = useState({
    name: "",
    email: "",
    phone: "",
    dateTime: new Date(),
  });
  useEffect(() => {
    setQuery({ ...query, phone: value });
  }, [value]);

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let endPoint = "https://getform.io/f/fb4af2dc-0f8f-4518-8963-28058e9fa205";

  // Form Submit function
  const formSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // Object.entries(query).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    // setDetails(formData);

    // fetch(`${endPoint}`, {
    //   method: "POST",
    //   body: formData,
    // }).then(() =>
    //   setQuery({
    //     name: "",
    //     email: "",
    //     phone: "",

    //     dateTime: "",
    //   })
    // );

    setDetails(query);
  };

  let btnText = "Submit";

  return (
    <div className={styles.App}>
      <form onSubmit={formSubmit}>
        <div className={styles.formWrapper} style={{ width: "80%" }}>
          <input
            type="text"
            name="name"
            className={styles.NameInput}
            required
            placeholder="Enter your Full Name*"
            value={query.name}
            style={{ borderBottom: "1px solid grey" }}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper} style={{ width: "80%" }}>
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
        <div className={styles.formWrapper} style={{ width: "80%" }}>
          <PhoneInput
            style={{
              border: "0",
              height: "50px",
              borderRadius: "3px",
              borderBottom: "1px solid grey",
            }}
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

        <button type="submit" className={styles.button}>
          {btnText}
          <BsArrowRightCircleFill />
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
