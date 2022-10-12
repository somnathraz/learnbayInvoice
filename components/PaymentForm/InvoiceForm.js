import React, { useState, useEffect } from "react";
import styles from "../ContactusForm/ContactUsForm.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import {
  AiOutlineCloseCircle,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineDatabase,
} from "react-icons/ai";
import { BsPhone, BsArrowRightShort } from "react-icons/bs";
import {
  BsFillJournalBookmarkFill,
  BsCalendarDate,
  BsFileEarmarkPdf,
} from "react-icons/bs";
import { MdOutlineAttachMoney, MdOutlinePayment } from "react-icons/md";
import { TbMinusVertical } from "react-icons/tb";

const InvoiceForm = ({ refund, salesMan }) => {
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
  let monthT = new Date().getMonth();
  let yearT = new Date().getFullYear();
  let DateString = `${dateT}${monthT}${yearT}`;

  const generateId = () => {
    let id = Math.floor(1000 + Math.random() * 9000) + DateString;
    return id;
  };

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
    }).then((t) => t.json());
    if (data.response === 200) {
      console.log(data.id);
      setPId(data.id);
    }
    if (data.response === 409) {
      verifyID();
    }
  };

  const [value, setValue] = useState();
  const [query, setQuery] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    courseName: "",
    paymentDate: "",
    coursePrice: "",
    paymentMode: "",
    salesEmail: "",
    InvoiceDate: new Date().toLocaleDateString,
    salesMan: salesMan,
    invoiceId: pId,
  });

  useEffect(() => {
    setQuery({ ...query, customerPhone: value, paymentDate: startDate });
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
  if (query.courseName === "Adv Data Science and AI (Basic/Pro/ProMax)") {
    code = "FAIML";
  }
  if (query.courseName === "Full Stack Developer course with certification") {
    code = "FSDC";
  }
  if (query.courseName === "Full Stack Developer course with certification") {
    code = "FSDC";
  }
  if (query.courseName === "Business Analytics Program For Professionals") {
    code = "BAP";
  }
  if (query.courseName === "Blockchain program and certification") {
    code = "BCP";
  }
  if (query.courseName === "Blockchain program and certification") {
    code = "BCP";
  }
  if (query.courseName === "Data Structures and Algorithms + System Design") {
    code = "DSAS";
  }

  //verify submit function
  const verifySubmit = async (e) => {
    e.preventDefault();
    verifyID();
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
            salesEmail: query.salesEmail,
            customerName: query.customerName,
            customerEmail: query.customerEmail,
            customerPhone: query.customerPhone,
            courseName: query.courseName,
            paymentDate: query.paymentDate.toLocaleDateString(),
            salesMan: query.salesMan,
            InvoiceDate: query.InvoiceDate,
            paymentMode: query.paymentMode,
            coursePrice: query.coursePrice,
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
        customerPhone: "",
        courseName: "",
        paymentDate: "",
        coursePrice: "",
        paymentMode: "",
        salesEmail: "",
        salesMan: "",
        invoiceId: id,
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
            name="salesEmail"
            required
            placeholder="Enter salesman Email*"
            className={styles.EmailInput}
            value={query.salesEmail}
            onChange={handleParam()}
          />
        </div>
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

            <option value="Adv Data Science and AI (Basic/Pro/ProMax)">
              Adv Data Science and AI (Basic/Pro/ProMax)
            </option>
            <option value="Full Stack Developer course with certification">
              Full Stack Developer course with certification
            </option>

            <option value="Blockchain program and certification">
              Blockchain program and certification
            </option>
            <option value="Business Analytics Program For Professionals">
              Business Analytics Program For Professionals
            </option>
            <option value="Data Structures and Algorithms + System Design">
              Data Structures and Algorithms + System Design
            </option>
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

            <option value="Razorpay">Razorpay</option>
            <option value="Liquiloans">Liquiloans</option>
            <option value="Direct Bank Transfer">Direct Bank Transfer</option>
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
            <div className={styles.circle} />
            <div className={styles.circle1} />
            <div className={styles.circle2} />
            <div className={styles.circle3} />
            <div className={styles.circle4} />
            <div className={styles.circle5} />

            <AiOutlineCloseCircle
              className={styles.close}
              onClick={() => {
                setVerify(false);
              }}
            />
            <h2>Verify Details</h2>
            <form className={styles.readOnly} onSubmit={formSubmit}>
              <div className={styles.readOnlyDiv}>
                <AiOutlineUser className={styles.formIcon} />
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="text"
                  id="salesEmail"
                  name="salesEmail"
                  value={query.salesEmail}
                  readOnly
                />
              </div>
              <div className={styles.readOnlyDiv}>
                <AiOutlineUser className={styles.formIcon} />
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
                <AiOutlineMail className={styles.formIcon} />
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
                <BsPhone className={styles.formIcon} />
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
                <BsFillJournalBookmarkFill className={styles.formIcon} />
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
                <MdOutlinePayment className={styles.formIcon} />
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
                <BsCalendarDate className={styles.formIcon} />
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
                <MdOutlineAttachMoney className={styles.formIcon} />
                <TbMinusVertical className={styles.formLine} />
                <input
                  type="number"
                  id="coursePrice"
                  name="coursePrice"
                  value={query.coursePrice}
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
