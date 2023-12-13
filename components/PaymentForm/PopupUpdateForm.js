import React, { useState, useEffect } from "react";
import styles from "../../styles/popupForm.module.css";

const UpdatePopupFrom = ({ id, setUpdateForm }) => {
  // console.log(id, "updateForm");
  const [popupData, setPopupData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, showList] = useState([]);
  const [query, setQuery] = useState({
    id: id,
    heading: "",
    subHeading: "",
    validText: "",
    para1: "",
    para2: "",
    page: [],
  });

  useEffect(() => {
    const fetchPopup = async () => {
      const data = await fetch("/api/Popup/singlePopup", {
        method: "POST",
        body: JSON.stringify({ id: id, soloData: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.status === 200) {
        const { myPost } = await data.json();
        // console.log(myPost);
        setQuery({
          id: id,
          heading: myPost.heading,
          para1: myPost.para1,
          para2: myPost.para2,
          validText: myPost.validText,
          subHeading: myPost.subHeading,
          page: [],
        });
        showList(myPost.page);
      }
    };
    fetchPopup();
  }, [id]);

  useEffect(() => {
    const fetchPopup = async () => {
      const data = await fetch("/api/Popup/generatePopup", {
        method: "GET",
      });
      if (data.status === 200) {
        const { popupData, msg } = await data.json();
        setPopupData(popupData);
      }
    };
    fetchPopup();
  }, []);

  // Update inputs value
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { page } = query;

    // Case 1 : The user checks the box
    if (checked) {
      setQuery({
        ...query,
        page: [...page, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setQuery({
        ...query,
        page: page.filter((e) => e !== value),
      });
    }
  };

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
    // console.log(query, "inside submit");

    // console.log("updating...");
    setLoading(true);

    try {
      const data = await fetch("/api/Popup/generatePopup", {
        method: "PATCH",
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.status === 200) {
        setQuery({
          heading: "",
          subHeading: "",
          validText: "",
          para1: "",
          para2: "",
          page: [],
        });

        alert("popup updated");
        setUpdateForm({ show: false, id: "" });
        e.target.checked = false;
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.App}>
      <form onSubmit={formSubmit}>
        <div className={styles.formWrapper}>
          <p style={{ margin: "0" }}>This popup is displayed in </p>
          {list.map((data, i) => {
            return <li key={i}>{data}</li>;
          })}
          <input
            id="heading"
            type="text"
            name="heading"
            required
            placeholder="Enter Popup Heading*"
            className={styles.EmailInput}
            value={query.heading}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            id="subHeading"
            type="text"
            name="subHeading"
            required
            placeholder="Enter Popup Sub Heading*"
            className={styles.EmailInput}
            value={query.subHeading}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            id="validText"
            type="text"
            name="validText"
            // required
            placeholder="Enter Popup Valid Time*"
            className={styles.EmailInput}
            value={query.validText}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <textarea
            type="text"
            name="para1"
            placeholder="Weekday/Weekend Evening/Morning : 11th Aug, 8 PM to 10 PM"
            className={styles.EmailInput}
            value={query.para1}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <textarea
            type="text"
            name="para2"
            placeholder="Weekday/Weekend Evening/Morning : 11th Aug, 8 PM to 10 PM"
            className={styles.EmailInput}
            value={query.para2}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <label>Select courses : To display popup</label>
          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Adv Data Science and AI"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Adv Data Science and AI
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Adv AI and ML Certification"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Adv AI and ML Certification
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Master in Cs"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Master in Cs
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Full Stack Developer course"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Full Stack Developer course
            </label>
          </div>

          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Business Analytics Program"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Business Analytics Program
            </label>
          </div>
          <div className={styles.checkBoxDiv}>
            <input
              type="checkbox"
              name="pages"
              value="Data Analytics Program"
              id="flexCheckDefault"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Data Analytics Program
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
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdatePopupFrom;
