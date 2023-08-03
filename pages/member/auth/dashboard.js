import React from "react";
import { withAuthSync } from "../../../lib/auth";
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import styles from "../../../styles/dashboard.module.css";
import InvoiceForm from "../../../components/PaymentForm/InvoiceForm";
import CounsellingReportForm from "../../../components/CounsellingReportForm/CounsellingReportForm";
import { HiOutlineDocumentReport } from "react-icons/hi";
import {
  AiOutlineUserAdd,
  AiOutlineUserSwitch,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { BsCalendar2Plus, BsInfoCircle, BsThreeDots } from "react-icons/bs";
import { BiCalendarEdit, FaCalendar } from "react-icons/bi";
import { RiCoupon2Line, RiHandCoinLine } from "react-icons/ri";
import { TbFileInvoice, TbReportAnalytics } from "react-icons/tb";
import AddUserFrom from "../../../components/PaymentForm/AddUserForm";
import Image from "next/image";
import GenerateReportForm from "../../../components/PaymentForm/GenerateReportForm";

const Dashboard = (props) => {
  const discountPercentRef = useRef();
  const couponLengthRef = useRef();
  const [showItem, setShowItem] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
    seventh: false,
    eight: false,
    ninth: false,
    tenth: false,
  });
  const [mobile, setMobile] = useState(false);
  const [startDate, setStartDate] = useState();
  const [showMenu, setShowMenu] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sidebarExpand, setSideBarExpand] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const [validCoupon, setValidCoupon] = useState({
    success: false,
    msg: "Coupon code will visible here",
  });

  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
    if (width > 481) {
      setMobile(false);
    }
  }, [mobile]);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  async function submitHandler(event) {
    event.preventDefault();
    const discountPercent = discountPercentRef.current.value;
    const couponLength = couponLengthRef.current.value;
    const expireDate = startDate;
    setLoading(true);
    const coupon = (generateString(couponLength) + discountPercent).trim();
    setCouponCode(coupon);

    try {
      const response = await fetch("/api/Database/getUserName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discountPercent: discountPercent,
          couponCode: coupon,
          expireAt: expireDate,
        }),
      });
      if (response.status === 200) {
        setValidCoupon({ success: true, msg: "successfully created" });
      } else if (response.status === 409) {
        setValidCoupon({ success: true, msg: "coupon already exist" });
      }
    } catch (err) {
      console.error(
        "You have an error in your code or there are network issues.",
        err
      );
    }
    setLoading(false);
  }
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  let username = props.token.token.split("@");

  return (
    <>
      {showMenu ? (
        <div
          className={sidebarExpand ? styles.menuBarExpand : styles.menuBar}
          onMouseEnter={() => setSideBarExpand(true)}
          onMouseLeave={() => setSideBarExpand(false)}
        >
          <div className={styles.menu}>
            <BsThreeDots className={styles.hamIcon} />
          </div>
          <div className={styles.close}>
            {sidebarExpand ? (
              <Image
                src="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/Learnbay-Logo.webp"
                alt="Skillslash"
                quality={100}
                objectFit="contain"
                width={mobile ? "140px" : "90px"}
                height="90px"
              />
            ) : (
              <Image
                src="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/Learnbay-Favicon-L.png"
                alt="Skillslash"
                quality={100}
                objectFit="contain"
                width={mobile ? "140px" : "40px"}
                height="40px"
              />
            )}

            {/* <span>
              <BsThreeDots className={styles.close} />
              CLOSE
            </span> */}
          </div>

          <div className={styles.list}>
            <div className={styles.head}>
              <p className={styles.head}>Function</p>
            </div>

            <span
              className={showItem.first ? styles.spanActive : styles.span}
              onClick={() =>
                setShowItem({
                  ...showItem,
                  first: true,
                  second: false,
                  third: false,
                  fourth: false,
                  fifth: false,
                  sixth: false,
                  seventh: false,
                  eight: false,
                  ninth: false,
                  tenth: false,
                })
              }
            >
              <RiCoupon2Line
                className={
                  showItem.first ? styles.barIconActive : styles.barIcon
                }
              />

              <p className={styles.item}>Add Coupon</p>
            </span>

            <span
              className={showItem.second ? styles.spanActive : styles.span}
              onClick={() =>
                setShowItem({
                  ...showItem,
                  second: true,
                  first: false,
                  third: false,
                  fourth: false,
                  fifth: false,
                  sixth: false,
                  seventh: false,
                  eight: false,
                  ninth: false,
                  tenth: false,
                })
              }
            >
              <TbFileInvoice
                className={
                  showItem.second ? styles.barIconActive : styles.barIcon
                }
              />

              <p className={styles.item}>Add Invoice</p>
            </span>

            <span
              className={showItem.seventh ? styles.spanActive : styles.span}
              onClick={() =>
                setShowItem({
                  ...showItem,
                  second: false,
                  first: false,
                  third: false,
                  fourth: false,
                  fifth: false,
                  sixth: false,
                  seventh: true,
                  eight: false,
                  ninth: false,
                  tenth: false,
                })
              }
            >
              <TbReportAnalytics
                className={
                  showItem.seventh ? styles.barIconActive : styles.barIcon
                }
              />

              <p className={styles.item}>Add Counselling Report</p>
            </span>

            <span
              className={showItem.sixth ? styles.spanActive : styles.span}
              onClick={() =>
                setShowItem({
                  ...showItem,
                  second: false,
                  first: false,
                  third: false,
                  fourth: false,
                  fifth: false,
                  sixth: true,
                  seventh: false,
                  eight: false,
                  ninth: false,
                  tenth: false,
                })
              }
            >
              <RiHandCoinLine
                className={
                  showItem.sixth ? styles.barIconActive : styles.barIcon
                }
              />

              <p className={styles.item}>Refund Form</p>
            </span>
            <span
              className={showItem.eight ? styles.spanActive : styles.span}
              onClick={() =>
                setShowItem({
                  ...showItem,
                  second: false,
                  first: false,
                  third: false,
                  fourth: false,
                  fifth: false,
                  sixth: false,
                  seventh: false,
                  eight: true,
                })
              }
            >
              <HiOutlineDocumentReport
                className={
                  showItem.eight ? styles.barIconActive : styles.barIcon
                }
              />

              <p className={styles.item}>Monthly Report</p>
            </span>

            <span
                  className={showItem.ninth ? styles.spanActive : styles.span}
                  onClick={() =>
                    setShowItem({
                      ...showItem,
                      third: false,
                      first: false,
                      second: false,
                      fourth: false,
                      fifth: false,
                      sixth: false,
                      seventh: false,
                      eight: false,
                      ninth: true,
                      tenth: false,
                    })
                  }
                >
                  <BiCalendarEdit
                    className={
                      showItem.ninth ? styles.barIconActive : styles.barIcon
                    }
                  />

                  <p className={styles.item}>Batch Details</p>
                </span>
                <span
                  className={showItem.tenth ? styles.spanActive : styles.span}
                  onClick={() =>
                    setShowItem({
                      ...showItem,
                      third: false,
                      first: false,
                      second: false,
                      fourth: false,
                      fifth: false,
                      sixth: false,
                      seventh: false,
                      eight: false,
                      ninth: false,
                      tenth: true,
                    })
                  }
                >
                  <BsInfoCircle
                    className={
                      showItem.tenth ? styles.barIconActive : styles.barIcon
                    }
                  />

                  <p className={styles.item}>Popup Details</p>
                </span>

            {props.token.role === "Admin" ? (
              <div className={styles.list}>
                <div className={styles.head}>
                  <p className={styles.head}>User</p>
                </div>
                <span
                  className={showItem.third ? styles.spanActive : styles.span}
                  onClick={() =>
                    setShowItem({
                      ...showItem,
                      third: true,
                      first: false,
                      second: false,
                      fourth: false,
                      fifth: false,
                      sixth: false,
                      seventh: false,
                      eight: false,
                      ninth: false,
                      tenth: false,
                    })
                  }
                >
                  <AiOutlineUserAdd
                    className={
                      showItem.third ? styles.barIconActive : styles.barIcon
                    }
                  />

                  <p className={styles.item}>Add User</p>
                </span>
                <span
                  className={showItem.fourth ? styles.spanActive : styles.span}
                  onClick={() =>
                    setShowItem({
                      ...showItem,
                      third: false,
                      first: false,
                      second: false,
                      fourth: true,
                      fifth: false,
                      sixth: false,
                      seventh: false,
                      eight: false,
                      ninth: false,
                      tenth: false,
                    })
                  }
                >
                  <AiOutlineUserDelete
                    className={
                      showItem.fourth ? styles.barIconActive : styles.barIcon
                    }
                  />

                  <p className={styles.item}>Delete User</p>
                </span>
                <span
                  className={showItem.fifth ? styles.spanActive : styles.span}
                  onClick={() =>
                    setShowItem({
                      ...showItem,
                      third: false,
                      first: false,
                      second: false,
                      fourth: false,
                      fifth: true,
                      sixth: false,
                      seventh: false,
                      eight: false,
                      ninth: false,
                      tenth: false,
                    })
                  }
                >
                  <AiOutlineUserSwitch
                    className={
                      showItem.fifth ? styles.barIconActive : styles.barIcon
                    }
                  />

                  <p className={styles.item}>Edit User</p>
                </span>
                
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={styles.header}>
        <h2 style={{ textAlign: "center" }}>Welcome {username[0]}</h2>
      </div>

      <div className={styles.dashboard}>
        {showItem.third ? (
          <div className={styles.loan}>
            <h2>Register a User</h2>
            <AddUserFrom />
          </div>
        ) : (
          ""
        )}

        {showItem.first ? (
          <div className={styles.couponWrap}>
            <h2>Generate Coupon Code</h2>
            <form onSubmit={submitHandler} className={styles.form}>
              <div className={styles.inner}>
                <input
                  type="number"
                  id="percent"
                  required
                  placeholder="Enter the Discount Percent"
                  ref={discountPercentRef}
                />
              </div>
              <div className={styles.inner}>
                <input
                  type="number"
                  id="length"
                  required
                  ref={couponLengthRef}
                  placeholder="Enter Coupon length"
                />
              </div>
              <div className={styles.inner}>
                <DatePicker
                  selected={startDate}
                  name="dateTime"
                  id="dateTime"
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeIntervals={15}
                  filterTime={filterPassedTime}
                  minDate={new Date()}
                  placeholderText="Enter Coupon Expire Date"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  required
                />
              </div>
              <div className={styles.inner}>
                {loading ? (
                  <div className="loader">Loading...</div>
                ) : (
                  <button>Generate Coupon</button>
                )}
              </div>
            </form>
            {validCoupon.success ? (
              <p className={styles.couponCode}>{couponCode}</p>
            ) : (
              <p className={styles.couponCodeS}>{validCoupon.msg}</p>
            )}
          </div>
        ) : (
          ""
        )}

        {showItem.sixth ? (
          <div className={styles.loan}>
            <h2>Generate Invoice</h2>
            <InvoiceForm
              refund
              salesMan={props.token.token}
              team={props.token.team}
            />
          </div>
        ) : (
          ""
        )}
        {showItem.second ? (
          <div className={styles.loan}>
            <h2>Generate Invoice</h2>
            <InvoiceForm salesMan={props.token.token} team={props.token.team} />
          </div>
        ) : (
          ""
        )}

        {showItem.seventh ? (
          <div className={styles.loan1}>
            <h2>Add Counselling Report</h2>
            <CounsellingReportForm
              salesMan={props.token.token}
              team={props.token.team}
            />
          </div>
        ) : (
          ""
        )}
        {showItem.eight ? (
          <div className={styles.loan}>
            <h2>Generate Monthly Report</h2>
            <GenerateReportForm email={props.token.token} />
          </div>
        ) : (
          ""
        )}
                {showItem.ninth ? (
          <div className={styles.loan}>
            <h2>Add Batch Details</h2>
            {/* <GenerateReportForm email={props.token.token} /> */}
          </div>
        ) : (
          ""
        )}
                {showItem.tenth ? (
          <div className={styles.loan}>
            <h2>Add Popup Details</h2>
            {/* <GenerateReportForm email={props.token.token} /> */}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default withAuthSync(Dashboard);
// Dashboard.getInitialProps = async (ctx) => {
//   const { token, USER } = nextCookie(ctx);
//   return {
//     initialName: USER,
//     token: token,
//   };
// };
