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
    team: "",
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
          team: query.team,
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
          role: "",
          team: "",
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
        <div className={styles.formWrapper}>
          <select
            name="team"
            required
            value={query.team}
            onChange={handleParam()}
            placeholder="Select Team*"
          >
            <option className={styles.option} value="">
              Select User Team*
            </option>

            <option value="Organic Team">Organic Team</option>
            <option value="Google ads-1 (Irfan)">Google ads-1 (Irfan)</option>
            <option value="Google ads-2 (Shah)">Google ads-2 (Shah)</option>
            <option value="Goal diggers">Goal diggers</option>
            <option value="Team Sarathi">Team Sarathi</option>
            <option value="Redeem Team">Redeem Team</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Fighters">Fighters</option>
            <option value="Visionaries United">Visionaries United</option>
            <option value="Justice League">Justice League</option>
            <option value="Trailblazers">Trailblazers</option>
            <option value="Hustlers">Hustlers</option>
            <option value="FS Phoenix">FS Phoenix</option>
            <option value="Champions">Champions</option>
            <option value="Gangsta's Paradise">Gangsta's Paradise</option>
            <option value="UnderGod's">UnderGod's</option>
            <option value="Upgrade - Masters">Upgrade - Masters</option>
            <option value="Falcon">Falcon</option>
            <option value="Team Legends">Team Legends</option>
            <option value="Upholders">Upholders</option>
            <option value="Gen Z">Gen Z</option>
            <option value="Avengers">Avengers</option>
            <option value="Alpha Squad">Alpha Squad</option>
            <option value="Operations">Operations</option>

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
