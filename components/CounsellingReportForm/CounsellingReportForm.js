import React, { useState, useEffect } from "react";
import styles from "./CounsellingReportForm.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import Image from "next/image";
import {
  AiOutlineCloseCircle,
  AiOutlineMail,
  AiOutlineDatabase,
} from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { TbMinusVertical } from "react-icons/tb";

const CounsellingReportForm = ({ refund, salesMan, team }) => {
  //offset to maintain time zone difference

  const [startDate, setStartDate] = useState();

  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);

  const [invoiceData, setInvoiceData] = useState({
    fPdfName: "",
    emailSent: "",
    myPost: "",
    fileUpload: "",
  });

  const [display, setDisplay] = useState(false);
  const [pId, setPId] = useState();

  let code;
  let dateT = new Date().getDate();
  let monthT = new Date().getMonth() + 1;
  let yearT = new Date().getFullYear();
  let DateString = `${dateT}${monthT}${yearT}`;

  const generateId = () => {
    let id = Math.floor(1000 + Math.random() * 9000) + DateString;
    return id;
  };

  let averageTimeline;


  useEffect(() => {
    const verifyID = async () => {
      let sendId = generateId();

      const data = await fetch("/api/uniqueId", {
        method: "POST",
        body: JSON.stringify({
          sendId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status === 200) {
        const { id } = await data.json();

        setPId(id);
      }
      if (data.status === 409) {
        verifyID();
      }
    };
    verifyID();
  }, []);

  const [value, setValue] = useState();

  const [query, setQuery] = useState({
    counselorName: "",
    stdGoal: "",
    stdEmail: "",
    stdPhone: "",
    stdName: "",
    stdExperience: "",
    stdDomain: "",
    stdCompany: "",
    stdCTC: "",
    suggestedProgram: "",
    primaryDomain: "",
    transitionDomain: "",
    averageHike: "",
    averageTimeline: "",
    counselorNote: "",
    salesMan: salesMan,
    counsellingId: pId,
  });

  useEffect(() => {
    setQuery({
      ...query,
      stdPhone: value,
      counsellingId: pId,
    });
  }, [value, pId]);

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  if (query.suggestedProgram === "Advanced Data science and AI Program") {
    code = "ADSAP";
    query.averageTimeline = "7 to 10 Months";
  }
  if (query.suggestedProgram === "Data Science and AI for managers and Leaders") {
    code = "DSAIM";
    query.averageTimeline = "11 to 14 Months";
  }
  if (query.suggestedProgram === "Advanced AI and ML Program") {
    code = "AIML";
    query.averageTimeline = "9 to 12 Months";
  }
  if (query.suggestedProgram === "Data science and AI Master Program") {
    code = "DSAM";
    query.averageTimeline = "13 to 15 Months";
  }
  if (query.suggestedProgram === "Data Analytics Program") {
    code = "DAP";
    query.averageTimeline = "5 to 7 Months";
  }
  if (query.suggestedProgram === "Business Analytics Program") {
    code = "BAP";
    query.averageTimeline = "5 to 7 Months";
  }



  //verify submit function
  const verifySubmit = async (e) => {
    e.preventDefault();

    setVerify(true);
  };

  // Form Submit function

  const formSubmit = async (e) => {
    e.preventDefault();
    // console.log("Queary", query);
    setLoading(true);
    try {
      const data = await fetch(`${"/api/CounsellingReport/counsellingReport"}`,
        {
          method: "POST",
          body: JSON.stringify({
            counselorName: query.counselorName,
            stdGoal: query.stdGoal,
            stdEmail: query.stdEmail,
            stdPhone: query.stdPhone,
            stdName: query.stdName,
            stdExperience: query.stdExperience,
            stdDomain: query.stdDomain,
            stdCompany: query.stdCompany,
            stdCTC: query.stdCTC,
            suggestedProgram: query.suggestedProgram,
            primaryDomain: query.primaryDomain,
            transitionDomain: query.transitionDomain,
            averageHike: query.averageHike,
            averageTimeline: query.averageTimeline,
            counselorNote: query.counselorNote,
            salesMan: salesMan,
            counsellingId: code + pId,
            team: team,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((t) => t.json());

      setInvoiceData({
        fPdfName: data.pdfName,
        emailSent: data.emailInfo,
        myPost: data.myPost,
        fileUpload: data.fileLink,
      });
      // console.log("invoice Data!!!",invoiceData)
      setQuery({
        counselorName: "",
        stdGoal: "",
        stdEmail: "",
        stdPhone: "",
        stdName: "",
        stdExperience: "",
        stdDomain: "",
        stdCompany: "",
        stdCTC: "",
        suggestedProgram: "",
        primaryDomain: "",
        transitionDomain: "",
        averageHike: "",
        averageTimeline: "",
        counselorNote: "",
        salesMan: ""
      });
      setValue("");
      setStartDate("");
      setVerify(false);
    } catch (error) {
      // console.log(error);
      console.log("error@@@")
    }
    setLoading(false);
    setDisplay(true);
  };

  let btnText = "Generate Counselling Report";

  return (
    <div className={styles.App}>
      <form onSubmit={verifySubmit}>
        <div className={styles.formWrapper}>
          <input
            type="text"
            name="counselorName"
            className={styles.NameInput}
            required
            placeholder="Enter Counselor Full Name*"
            value={query.counselorName}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="text"
            name="stdGoal"
            className={styles.NameInput}
            required
            placeholder="Enter Goal*"
            value={query.stdGoal}
            onChange={handleParam()}
          />
        </div>

        <div className={styles.formWrapper}>
          <input
            type="email"
            name="stdEmail"
            required
            placeholder="Enter Student Email*"
            className={styles.EmailInput}
            value={query.stdEmail}
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
            name="stdPhone"
            rules={{ required: true }}
            defaultCountry="IN"
            placeholder="Enter Student Phone Number*"
            className={styles.Phone}
            value={value}
            required
            onChange={setValue}
          />
        </div>

        <div className={styles.formWrapper}>
          <input
            type="text"
            name="stdName"
            className={styles.NameInput}
            required
            placeholder="Enter Student Full Name*"
            value={query.stdName}
            onChange={handleParam()}
          />
        </div>

        <div className={styles.formWrapper}>
          <input
            type="number"
            name="stdExperience"
            className={styles.NameInput}
            required
            placeholder="Enter Student Experience*"
            value={query.stdExperience}
            onChange={handleParam()}
          />
        </div>

        <div className={styles.formWrapper}>
          <input
            type="text"
            name="stdDomain"
            className={styles.NameInput}
            required
            placeholder="Enter Student Domain"
            value={query.stdDomain}
            onChange={handleParam()}
          />
        </div>

        <div className={styles.formWrapper}>
          <input
            type="text"
            name="stdCompany"
            className={styles.NameInput}
            placeholder="Enter Student Company"
            value={query.stdCompany}
            onChange={handleParam()}
            required
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="number"
            name="stdCTC"
            className={styles.NameInput}
            placeholder="Enter Student CTC"
            value={query.stdCTC}
            onChange={handleParam()}
            required
          />
        </div>

        <div className={styles.formWrapper}>
          <select
            name="suggestedProgram"
            required
            value={query.suggestedProgram}
            onChange={handleParam()}
            placeholder="Select a Suggested Program*"
          >
            <option className={styles.option} value="">
              Select a Suggested Program*
            </option>

            <option value="Advanced Data science and AI Program">
              Advanced Data science and AI Program
            </option>
            <option value="Data Science and AI for managers and Leaders">
              Data Science and AI for managers and Leaders
            </option>

            <option value="Advanced AI and ML Program">
              Advanced AI and ML Program
            </option>
            <option value="Data science and AI Master Program">
              Data science and AI Master Program
            </option>
            <option value="Data Analytics Program">
              Data Analytics Program
            </option>
            <option value="Business Analytics Program">
              Business Analytics Program
            </option>

          </select>
        </div>

        <div className={styles.formWrapper}>
          <input
            type="text"
            name="primaryDomain"
            className={styles.NameInput}
            placeholder="Enter Student Primary Domain"
            value={query.primaryDomain}
            onChange={handleParam()}
            required
          />
        </div>

        <div className={styles.formWrapper}>
          <select
            name="transitionDomain"
            required
            value={query.transitionDomain}
            onChange={handleParam()}
            placeholder="Select Transition Domain"
          >
            <option className={styles.option} value="">
              Select Transition Domain
            </option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="BFSI">BFSI</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Retail & E-commerce">Retail & E-commerce</option>
            <option value="Media and Hospitality">Media and Hospitality</option>
            <option value="Transportation">Transportation</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Automotive">Automotive</option>
            <option value="Telecommunication">Telecommunication</option>
            <option value="Energy, Oil & Gas">Energy, Oil & Gas</option>
          </select>
        </div>

        <div className={styles.formWrapper}>
          <input
            type="number"
            name="averageHike"
            required
            placeholder="Enter Average Hike*"
            className={styles.EmailInput}
            value={query.averageHike}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <textarea
            type="textbox"
            name="counselorNote"
            required
            placeholder="Enter counselor Note*"
            className={styles.EmailInput}
            value={query.counselorNote}
            onChange={handleParam()}
          />
        </div>

       

        <input type="hidden" id="salesMan" name="salesMan" value={salesMan} />
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
        <div className={styles.formWrapper}>
        <input
          type="hidden"
          name="averageTimeline"
          required
          placeholder="Enter Average TimeLine*"
          className={styles.EmailInput}
          value={query.averageTimeline}
          onChange={handleParam()}
        />
      </div>
      </form>

      {verify ? (
        <div className={styles.infoWrap}>
          <div className={styles.infoD}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/google-background-verify.webp"
              layout="fill"
              alt="review"
            />
            <AiOutlineCloseCircle
              className={styles.close}
              onClick={() => {
                setVerify(false);
              }}
            />
            <h2>Verify Details</h2>
            <form className={styles.readOnly} onSubmit={formSubmit}>
              <div className={styles.readOnlyDiv}>
                <span> Student Name</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="stdName"
                  name="stdName"
                  value={query.stdName}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span> Counselor Name</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="counselorName"
                  name="counselorName"
                  value={query.counselorName}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Student Email</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="stdEmail"
                  name="stdEmail"
                  value={query.stdEmail}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Student phone</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="phone"
                  id="stdPhone"
                  name="stdPhone"
                  value={query.stdPhone}
                  readOnly
                />
              </div>

              <div className={styles.readOnlyDiv}>
                <span>Program Name</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="suggestedProgram"
                  name="suggestedProgram"
                  value={query.suggestedProgram}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Transition Domain</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="transitionDomain"
                  name="transitionDomain"
                  value={query.transitionDomain}
                  readOnly
                />
              </div>

              <div className={styles.readOnlyDiv}>
                <span>Student Company</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="stdCompany"
                  name="stdCompany"
                  value={query.stdCompany}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Student Experience</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="stdExperience"
                  name="stdExperience"
                  value={query.stdExperience}
                  readOnly
                />
              </div>

              <div className={styles.readOnlyCheck}>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="I have verified all the details"
                  required
                />
                <input
                  type="hidden"
                  id="salesman"
                  name="salesman"
                  value={salesMan}
                />
                <label htmlFor="vehicle1">
                  I have verified all the details
                </label>
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
                <button type="submit">
                  Procced
                  <BsArrowRightShort className={styles.buttonIcon} />
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        ""
      )}


      {display ? (
        <div className={styles.infoWrap}>
          <div className={styles.infoD}>
            <Image
              src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/google-background-verify.webp"
              layout="fill"
              alt="review"
            />
            <AiOutlineCloseCircle
              className={styles.close}
              onClick={() => {
                setDisplay(false);
              }}
            />
            <h2>Invoice Generated Successfully</h2>

            <div className={styles.detailsDiv}>
              <div className={styles.readOnlyDiv}>
                <AiOutlineMail className={styles.formIcon} />
                <TbMinusVertical className={styles.formLine} />
                <p>{invoiceData.emailSent}</p>
              </div>
              <div className={styles.readOnlyDiv}>
                <BsFileEarmarkPdf className={styles.formIcon} />
                <TbMinusVertical className={styles.formLine} />
                <p>{invoiceData.fPdfName}</p>
              </div>
              <div className={styles.readOnlyDiv}>
                <BsFileEarmarkPdf className={styles.formIcon} />
                <TbMinusVertical className={styles.formLine} />
                <p>
                  <a href={invoiceData.fileUpload}>{invoiceData.fileUpload}</a>
                </p>
              </div>
              <div className={styles.readOnlyDiv}>
                <AiOutlineDatabase className={styles.formIcon} />
                <TbMinusVertical className={styles.formLine} />
                <p>Uploaded to database InsertionId: {invoiceData.myPost}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CounsellingReportForm;




  // <div className={styles.inner} style={{ marginBottom: "10px" }}>
        //   <DatePicker
        //     selected={startDate}
        //     name="counsellingDate"
        //     id="dateTime"
        //     onChange={(date) => {
        //       setStartDate(date);
        //     }}
        //     wrapperClassName={styles.date}
        //     className={styles.datePicker}
        //     placeholderText="Enter Date"
        //     dateFormat="MMMM d, yyyy"
        //     required
        //   />
        // </div>


        // <div className={styles.readOnlyDiv}>
        //         <span>Counselling Date</span>
        //         <TbMinusVertical className={styles.formLine} />
        //         <input
        //           type="text"
        //           id="counsellingDate"
        //           name="counsellingDate"
        //           value={startDate}
        //           readOnly
        //         />
        //       </div>