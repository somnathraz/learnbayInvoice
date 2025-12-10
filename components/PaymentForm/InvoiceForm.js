import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
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
import jsCookie from "js-cookie";
const InvoiceForm = ({ refund, salesMan, team }) => {
  //offset to maintain time zone difference
  const sales = jsCookie.get("token");
  const salesEmailId = JSON.parse(sales);

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
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    courseName: "",
    counselorEmail: "",
    counselorEmailCC: "",
    paymentDate: "",
    coursePrice: "",
    paymentMode: "",
    InvoiceDate: `${dateT}/${monthT}/${yearT}`,
    salesMan: salesEmailId.token,
    invoiceId: pId,
    paymentType: "",
    emiTenure: "",
  });

  useEffect(() => {
    setQuery({
      ...query,
      customerPhone: value,
      paymentDate: startDate,
      invoiceId: pId,
    });
  }, [value, startDate, pId]);

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  if (query.courseName === "masters degree") {
    code = "MD";
  }
  if (query.courseName === "Masters degree upgrade") {
    code = "MAU";
  }
  if (
    query.courseName === "Master's in Computer Science: Data Science and AI"
  ) {
    code = "MCSD";
  }
  if (query.courseName === "Advanced Data science and AI Program") {
    code = "ADSAP";
  }
  if (query.courseName === "Data Science and AI for managers and Leaders") {
    code = "DSAIM";
  }
  if (query.courseName === "Advanced AI and ML Program") {
    code = "AIML";
  }
  if (query.courseName === "Data science and AI Master Program") {
    code = "DSAM";
  }
  if (query.courseName === "Data Analytics Program") {
    code = "DAP";
  }
  if (query.courseName === "Business Analytics Program") {
    code = "BAP";
  }
  if (query.courseName === "Software Development masters program") {
    code = "SDMP";
  }
  if (query.courseName === "DSA and system design") {
    code = "DSA";
  }
  if (query.courseName === "Data science and AI foundation program") {
    code = "DSAF";
  }
  if (query.courseName === "Full stack web development course") {
    code = "FDC";
  }
  if (query.courseName === "Data structure and Algorithm") {
    code = "DSA";
  }
  if (query.courseName === "System designing") {
    code = "SD";
  }
  if (query.courseName === "Software development program for freshers") {
    code = "FSDF";
  }
  if (
    query.courseName ===
    "Advance Cloud Computing & DevOps Certification Program"
  ) {
    code = "ACDC";
  }
  if (query.courseName === "AWS Cloud & Devops Certification") {
    code = "Acdc";
  }
  if (
    query.courseName ===
    "Executive program in Data Science and AI from IIT Guwahati"
  ) {
    code = "exda";
  }
  if (query.courseName === "Advance Data Analytics Program from IIT Guwahati") {
    code = "Adaiit";
  }

  if (query.courseName === "GenAI Developer Certification for Professionals") {
    code = "GENAIPRO";
  }
  if (query.courseName === "GenAI Certification for Managers & Tech Leaders") {
    code = "GENAIMTL";
  }
  if (query.courseName === "Gen-AI program | Learnbay") {
    code = "GAIPL";
  }
  if (
    query.courseName ===
    "Executive Certification in Cyber Security & Ethical Hacking"
  ) {
    code = "ECCSEH";
  }
  if (
    query.courseName ===
    "Executive Certification in Cloud and Devops in Collaboration With E&ICT IIT Guwahati"
  ) {
    code = "ECECITG";
  }

  if (
    query.courseName ===
    "Advanced Certification in Cyber Security & Ethical Hacking"
  ) {
    code = "ACICEH";
  }

  if (
    query.courseName ===
    "[Master Track] Data Science and GenAI Master Certification Program"
  ) {
    code = "MTDSGENAIMCP";
  }

  if (
    query.courseName ===
    "[Master Track] Full Stack Software Development Master Certification"
  ) {
    code = "MTFSSDMC";
  }

  if (
    query.courseName ===
    "[Master Track] Cloud and DevOps Engineering Master Certification Program"
  ) {
    code = "MTCDEMCP";
  }

  if (
    query.courseName ===
    "[Master Track] Data Analytics and Business Analytics Master Certification Program"
  ) {
    code = "MTDABAMCP";
  }
  //verify submit function
  const verifySubmit = async (e) => {
    e.preventDefault();

    setVerify(true);
  };

  // Form Submit function

  const formSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const data = await fetch(
        `${refund ? "/api/Invoice/refundInvoice" : "/api/Invoice/invoice"}`,
        {
          method: "POST",
          body: JSON.stringify({
            salesEmail: query.salesMan,
            customerName: query.customerName,
            customerEmail: query.customerEmail,
            customerPhone: query.customerPhone,
            counselorEmail: query.counselorEmail,
            counselorEmailCC: query.counselorEmailCC,
            courseName: query.courseName,
            paymentDate: query.paymentDate.toLocaleDateString("en-US"),
            salesMan: query.salesMan,
            InvoiceDate: query.InvoiceDate,
            paymentMode: query.paymentMode,
            coursePrice: query.coursePrice,
            paymentType: query.paymentType,
            team: team,
            emiTenure: query.emiTenure,
            invoiceId: code + pId,
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
      setQuery({
        customerName: "",
        customerEmail: "",
        counselorEmail: "",
        customerPhone: "",
        counselorEmailCC: "",
        courseName: "",
        paymentDate: "",
        coursePrice: "",
        paymentMode: "",
        salesEmail: "",
        salesMan: salesEmailId.token,
        invoiceId: "",
        paymentType: "",
        emiTenure: "",
      });
      setValue("");
      setStartDate("");
      setVerify(false);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setDisplay(true);
  };

  let btnText = "Generate Invoice";

  return (
    <div className={styles.App}>
      <form onSubmit={verifySubmit}>
        <div className={styles.formWrapper}>
          <input
            type="text"
            name="customerName"
            className={styles.NameInput}
            required
            placeholder="Enter Customer Full Name*"
            value={query.customerName}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="email"
            name="counselorEmail"
            className={styles.NameInput}
            required
            placeholder="Enter Counselor Email*"
            value={query.counselorEmail}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="email"
            name="counselorEmailCC"
            className={styles.NameInput}
            required
            placeholder="Enter CC Email*"
            value={query.counselorEmailCC}
            onChange={handleParam()}
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="email"
            name="customerEmail"
            required
            placeholder="Enter Customer Email*"
            className={styles.EmailInput}
            value={query.customerEmail}
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
            name="customerPhone"
            rules={{ required: true }}
            defaultCountry="IN"
            placeholder="Enter Customer Phone Number*"
            className={styles.Phone}
            value={value}
            required
            onChange={setValue}
          />
        </div>
        <div className={styles.formWrapper}>
          <select
            name="courseName"
            required
            value={query.courseName}
            onChange={handleParam()}
            placeholder="Select a course*"
          >
            <option className={styles.option} value="">
              Select a course*
            </option>
            <option value="masters degree">masters degree</option>
            <option value="Masters degree upgrade">
              Masters degree upgrade
            </option>
            <option value="Master's in Computer Science: Data Science and AI">
              Master's in Computer Science: Data Science and AI
            </option>
            <option value="Advanced Data science and AI Program">
              Advanced Data science and AI Program
            </option>
            <option value="Data Science and AI for managers and Leaders">
              Data Science and AI for managers and Leaders
            </option>
            <option value="Data science and AI foundation program">
              Data science and AI foundation program
            </option>
            <option value="Data Science and AI for BFSI Professionals">
              Data Science and AI for BFSI Professionals
            </option>
            <option value="HR Analytics Program">HR Analytics Program</option>
            <option value="Marketing Analytics Program">
              Marketing Analytics Program
            </option>
            <option value="Business Analytics Master Program">
              Business Analytics Master Program
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
            <option value="Software Development masters program">
              Software Development masters program
            </option>
            <option value="Full stack web development course">
              Full stack web development course
            </option>
            <option value="DSA and system design">DSA and system design</option>
            <option value="Data structure and Algorithm">
              Data structure and Algorithm
            </option>
            <option value="System designing">System designing</option>
            <option value="Software development program for freshers">
              Software development program for freshers
            </option>
            <option value="Advance Cloud Computing & DevOps Certification Program">
              Advance Cloud Computing & DevOps Certification Program
            </option>
            <option value="AWS Cloud & Devops Certification">
              AWS Cloud & Devops Certification
            </option>
            <option value="Executive program in Data Science and AI from IIT Guwahati">
              Executive program in Data Science and AI from IIT Guwahati
            </option>
            <option value="Advance Data Analytics Program from IIT Guwahati">
              Advance Data Analytics Program from IIT Guwahati
            </option>

            <option value="GenAI Developer Certification for Professionals">
              GenAI Developer Certification for Professionals
            </option>

            <option value="GenAI Certification for Managers & Tech Leaders">
              GenAI Certification for Managers & Tech Leaders
            </option>
            <option value="Gen-AI program | Learnbay">
              Gen-AI program | Learnbay
            </option>
            <option value="Executive Certification in Cyber Security & Ethical Hacking">
              Executive Certification in Cyber Security & Ethical Hacking
            </option>

            <option value="Executive Certification in Cloud and Devops in Collaboration With E&ICT IIT Guwahati">
              Executive Certification in Cloud and Devops in Collaboration With
              E&ICT IIT Guwahati
            </option>

            <option value="Advanced Certification in Cyber Security & Ethical Hacking">
              Advanced Certification in Cyber Security & Ethical Hacking
            </option>
            {/* new courses */}
            <option value="[Master Track] Data Science and GenAI Master Certification Program">
              [Master Track] Data Science and GenAI Master Certification Program
            </option>
            <option value="[Master Track] Full Stack Software Development Master Certification">
              [Master Track] Full Stack Software Development Master
              Certification
            </option>
            <option value="[Master Track] Cloud and DevOps Engineering Master Certification Program">
              [Master Track] Cloud and DevOps Engineering Master Certification
              Program
            </option>
            <option value="[Master Track] Data Analytics and Business Analytics Master Certification Program">
              [Master Track] Data Analytics and Business Analytics Master
              Certification Program
            </option>
            <option value="Applied AI Practitioner Program by IIT Patna">
              Applied AI Practitioner Program by IIT Patna
            </option>
            {/* new courses */}
          </select>
        </div>
        <div className={styles.formWrapper}>
          <select
            name="emiTenure"
            required
            value={query.emiTenure}
            onChange={handleParam()}
            placeholder="Select a course*"
          >
            <option className={styles.option} value="">
              Select a EMI Tenure*
            </option>
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
            <option value="15">15</option>
            <option value="18">18</option>
            <option value="24">24</option>
          </select>
        </div>
        <div className={styles.formWrapper}>
          <select
            name="paymentMode"
            required
            value={query.paymentMode}
            onChange={handleParam()}
            placeholder="Select Payment Mode*"
          >
            <option className={styles.option} value="">
              Payment Mode*
            </option>

            <option value="Propelld">Propelld</option>
            <option value="Shopse">Shopse</option>
            <option value="Bajaj">Bajaj</option>
            <option value="Razorpay">Razorpay</option>
            <option value="FIBE">FIBE</option>
            <option value="Liquiloans">Liquiloans</option>
            <option value="Cashfree">Cashfree</option>
            <option value="Direct Bank Transfer">Direct Bank Transfer</option>
            <option value="Finz">FinZ</option>
            <option value="Cash payment">Cash payment</option>
            <option value="Techfino">Techfino</option>
            <option value="Auxilo">Auxilo</option>
          </select>
        </div>

        <div className={styles.inner} style={{ marginBottom: "10px" }}>
          <DatePicker
            selected={startDate}
            name="paymentDate"
            id="dateTime"
            onChange={(date) => {
              setStartDate(date);
            }}
            wrapperClassName={styles.date}
            className={styles.datePicker}
            placeholderText="Enter Payment Date"
            dateFormat="MMMM d, yyyy"
            required
          />
        </div>
        <div className={styles.formWrapper}>
          <input
            type="number"
            name="coursePrice"
            required
            placeholder="Enter the amount*"
            className={styles.EmailInput}
            value={query.coursePrice}
            onChange={handleParam()}
          />
        </div>

        <div className={styles.formWrapper}>
          <select
            name="paymentType"
            required
            value={query.paymentType}
            onChange={handleParam()}
            placeholder="Select Payment Type*"
          >
            <option className={styles.option} value="">
              Payment Type*
            </option>

            <option value="Full Payment">Full Payment</option>
            <option value="Partial Payment">Partial Payment</option>
            <option value="Loan EMI">Loan EMI</option>
          </select>
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
      </form>
      {verify ? (
        <div className={styles.infoWrap}>
          <div className={styles.infoD}>
            <AiOutlineCloseCircle
              className={styles.close}
              onClick={() => {
                setVerify(false);
              }}
            />
            <h2>Verify Details</h2>
            <form className={styles.readOnly} onSubmit={formSubmit}>
              <div className={styles.readOnlyDiv}>
                <span> Customer Name</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="CustomerName"
                  name="CustomerName"
                  value={query.customerName}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span> Counselor Email</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="CounselorEmail"
                  name="CounselorEmail"
                  value={query.counselorEmail}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Customer Email</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="customerEmail"
                  name="customerEmail"
                  value={query.customerEmail}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Customer phone</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="phone"
                  id="customerPhone"
                  name="customerPhone"
                  value={query.customerPhone}
                  readOnly
                />
              </div>

              <div className={styles.readOnlyDiv}>
                <span>Course Name</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  value={query.courseName}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Emi Tenure</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="emiTenure"
                  name="emiTenure"
                  value={query.emiTenure}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Payment Mode</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="paymentMode"
                  name="paymentMode"
                  value={query.paymentMode}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Payment Date</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="paymentDate"
                  name="paymentDate"
                  value={startDate}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>course price</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="number"
                  id="coursePrice"
                  name="coursePrice"
                  value={query.coursePrice}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <span>Payment Type</span>
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="paymentType"
                  name="paymentType"
                  value={query.paymentType}
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

export default InvoiceForm;
