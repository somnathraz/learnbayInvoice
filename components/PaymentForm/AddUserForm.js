import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import "react-phone-number-input/style.css";
import { BiShow, BiHide } from "react-icons/bi";
import Toast from "../Toast/Toast";

const AddUserFrom = () => {
  //offset to maintain time zone difference

  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    msg: "",
    success: true,
  });
  const [showPass, setShowPass] = useState(false);
  const [query, setQuery] = useState({
    email: "",
    password: "",
    role: "",
  });

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
      const data = await fetch("/api/User/register", {
        method: "POST",
        body: JSON.stringify({
          email: query.email,
          password: query.password,
          role: query.role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((t) => t.json());
      if (data.response === 200) {
        setUser({ ...user, email: data.email, password: data.password });
        setQuery({
          email: "",
          password: "",
        });
        setUser({ ...user, msg: data.message, success: true });
      } else {
        setDisplay(true);
        setUser({ ...user, msg: data.message, success: false });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDisplay(false);
    }, 100);
    clearTimeout(timeOut);
  }, [display]);
  let btnText = "create user";

  return (
    <div className={styles.App}>
      <form
        onSubmit={formSubmit}
        onChange={() => {
          setUser({ ...user, msg: "" });
          setDisplay(false);
        }}
      >
        <div className={styles.formWrapper}>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Enter User Email*"
            className={styles.EmailInput}
            value={query.email}
            onChange={handleParam()}
          />
          {user.msg === "" ? "" : <label htmlFor="email">{user.msg}</label>}
        </div>

        <div className={styles.formWrapper}>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            required
            placeholder="Enter User Password*"
            className={styles.EmailInput}
            value={query.password}
            onChange={handleParam()}
          />
          {showPass ? (
            <BiShow
              className={styles.showBtn}
              onClick={() => setShowPass(false)}
            />
          ) : (
            <BiHide
              className={styles.showBtn}
              onClick={() => setShowPass(true)}
            />
          )}
        </div>
        <div className={styles.formWrapper}>
          <select
            name="role"
            required
            value={query.role}
            onChange={handleParam()}
            placeholder="Select User Role*"
          >
            <option className={styles.option} value="">
              User Role*
            </option>

            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
          </select>
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
      {display ? <Toast content={user.msg} success={user.success} shows /> : ""}
    </div>
  );
};

export default AddUserFrom;
