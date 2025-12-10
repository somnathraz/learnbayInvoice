import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import axios from "axios";
import {
  decrementQuantity,
  removeFromCart,
  deleteCart,
} from "../redux/cart.slice";
import styles from "../styles/CartPage.module.css";
import PaymentForm from "../components/PaymentForm/PaymentForm";
import { useRouter } from "next/router";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsClipboardPlus, BsClipboardCheck } from "react-icons/bs";
import Toast from "../components/Toast/Toast";
import getConfig from "next/config";

const CartPage = ({ isConnected }) => {
  const { publicRuntimeConfig } = getConfig();
  const instance = axios.create({
    baseURL: publicRuntimeConfig.backendUrl,
  });
  const router = useRouter();
  const [payment, setPayments] = useState(false);
  const couponDataCartRef = useRef();
  const [redirectSeconds, setRedirectSeconds] = useState(15);
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [copy, setCopy] = useState({ copy1: false, copy2: false });
  let couponDataCode = "";
  const [successHandel, setSuccessHandel] = useState(false);
  const [showPayDetails, setShowPayDetails] = useState({
    paymentId: "",
    orderId: "",
    msg: "",
  });

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    couponCode: "",
    dateTime: new Date(),
  });
  const [pdfNames, setPdfNames] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountMsg, setDiscountMsg] = useState("");

  // useEffect(() => {
  //   if (payment) {
  //     const interval = setInterval(() => {
  //       console.log(redirectSeconds);
  //       if (redirectSeconds > 0) {
  //         setRedirectSeconds(redirectSeconds - 1);
  //       } else {
  //         clearInterval(interval);
  //         router.push("/");
  //       }
  //     }, 1000);
  //   }
  // }, [payment]);

  const getTotalPrice = () => {
    console.log("normal method");
    return cart.reduce(
      (accumulator, item) =>
        parseFloat(accumulator + item.quantity * item.price).toLocaleString(
          "en-US"
        ),
      0
    );
  };
  const getDiscountPrice = () => {
    return cart.reduce(
      (accumulator, item) =>
        parseFloat(
          accumulator +
            item.quantity * item.price -
            (discount / 100) * (accumulator + item.quantity * item.price)
        ).toLocaleString("en-US"),
      0
    );
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API

    const data = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({ prop: cart, discount: discount }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((t) => t.json());

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Skillslash Pvt Ltd",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: `Thank you for Enrolling in our ${data.name}`,
      image:
        "https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/Learnbay-Logo.png",
      handler: async function (response) {
        setSuccessHandel(true);
        setPayLoading(true);
        const paymentData = {
          orderCreationId: data.id,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          TotalPrice: data.amount,
          GST: data.GST,
          coursePrice: data.coursePrice,
          name: details.name,
          email: details.email,
          phone: details.phone,
          courseName: data.name,
          time: new Date(),
          pdfName: pdfNames,
        };

        // Validate payment at server - using webhooks is a better idea.
        const result = await axios.post("/api/success", paymentData);

        //Show user that payment is successful

        console.log(result, "verifyData");
        console.log(
          response.razorpay_payment_id + "id",
          "/n",
          response.razorpay_order_id + "orderid",
          "/n",
          response.razorpay_signature + "signature"
        );
        let id = Math.floor(1000 + Math.random() * 9000);
        const invoiceData = {
          customerName: details.name,
          customerEmail: details.email,
          invoiceId: id,
          invoiceDate: new Date(),
          paymentDate: new Date(),
          courseName: data.name,
          GST: data.GST,
          customerPhone: details.phone,
          coursePrice: cart[0].price,
          DiscountPrice: (discount / 100) * cart[0].price,
          TotalPrice: data.amount,
        };

        try {
          const data = await axios.post(`/api/generateInvoice`, invoiceData);
          // convert the response into an array Buffer
          if (data.response === 200) {
            const pdfName = data.json();
            console.log(pdfName);
            setPdfNames(pdfName);
          }
        } catch (error) {}

        //sending data to db//
        const dbSend = await axios.post("/api/databaseAuth", paymentData);
        const formData = new FormData();
        Object.entries(paymentData).forEach(([key, value]) => {
          formData.append(key, value);
        });

        fetch("https://getform.io/f/fb4af2dc-0f8f-4518-8963-28058e9fa205", {
          method: "POST",
          body: formData,
        });

        console.log(dbSend, "database payment data");
        setPayLoading(false);
        setShowPayDetails({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          msg: "payment Successful",
        });

        // console.log(dbSend, "database data");

        try {
          const response = await fetch("/api/Database/getCoupon", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              couponCodeNameData: couponDataCartRef.current.value,
            }),
          });
          if (response.status === 200) {
            const { couponNameData, msg } = await response.json();
            console.log(msg);
          }
          if (response.status === 404) {
            const { msg } = await response.json();
            console.log(msg);
          }
        } catch (error) {}
        setPayments(true);
      },
      prefill: {
        name: details.name,
        email: details.email,
        contact: details.phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  async function submitHandler(event) {
    event.preventDefault();
    console.log("handler");
    couponDataCode = couponDataCartRef.current.value;
    setDetails({ ...details, couponCode: couponDataCode });

    if (couponDataCode === "") {
      setDiscountMsg("Enter coupon code");
      return;
    } else {
      setLoading(true);
      try {
        const response = await fetch("/api/Database/getCoupon", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            couponCode: couponDataCode,
          }),
        });
        if (response.status === 200) {
          const { couponName, msg } = await response.json();
          console.log(typeof parseInt(couponName.discountPercent), "FrontEnd");
          setDiscount(parseInt(couponName.discountPercent));
          setDiscountMsg(msg);
        } else if (response.status === 404) {
          setDiscountMsg("Coupon Not Valid");
        }
      } catch (err) {
        console.error(
          "You have an error in your code or there are network issues.",
          err
        );
      }
      setLoading(false);
    }
  }

  // const generateInvoice = (name) => {
  //   console.log("generatePDF");
  //   // send a post request with the name to our API endpoint
  //   const fetchData = async () => {
  //     const data = await fetch("/api/generateInvoice", {
  //       method: "POST",
  //       body: { name },
  //     });
  //     // convert the response into an array Buffer
  //     if (data.response === 200) {
  //       const pdfName = data.json();
  //       setPdfNames(pdfName);
  //     }
  //   };
  //   console.log(fetchData);
  //   // convert the buffer into an object URL
  //   // const saveAsPDF = async () => {
  //   //   const buffer = await fetchData();
  //   //   const blob = new Blob([buffer]);
  //   //   const link = document.createElement("a");
  //   //   link.href = URL.createObjectURL(blob);
  //   //   link.download = "invoice.pdf";
  //   //   link.click();
  //   // };

  //   // saveAsPDF();
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>cart-skillslash</title>
      </Head>
      <>
        <div className={styles.header}>
          <div>Image</div>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Actions</div>
          <div>Total Price</div>
        </div>
        {cart.map((item, i) => (
          <div className={styles.body} key={item.id}>
            <div className={styles.image}>
              <Image src={item.image} height="90" width="65" alt="hello" />
            </div>
            <p>{item.name}</p>
            <p>₹ {item.price.toLocaleString("en-US")}</p>
            <p>{item.quantity}</p>
            <div className={styles.buttons}>
              <button onClick={() => dispatch(decrementQuantity(item.id))}>
                -
              </button>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                x
              </button>
            </div>
            <p>
              ₹ {parseFloat(item.quantity * item.price).toLocaleString("en-US")}
            </p>
          </div>
        ))}
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              id="percent"
              required
              ref={couponDataCartRef}
              placeholder="Enter Promo code"
            />
            {discountMsg === "" ? "" : <p>{discountMsg}</p>}
          </div>
          <div>
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
              <button type="submit">Apply Coupon</button>
            )}
          </div>
        </form>

        <h2>
          Grand Total: ₹{" "}
          {discount === "" ? getTotalPrice() : getDiscountPrice()}
        </h2>

        <PaymentForm setDetails={setDetails} />
        <button
          onClick={() => {
            makePayment();
            dispatch(deleteCart);
          }}
        >
          CheckOut
        </button>
        {successHandel ? (
          <div className={styles.paymentShow}>
            <div className={styles.innerPayment}>
              <AiOutlineCloseCircle
                className={styles.cross}
                onClick={() => setSuccessHandel(false)}
              />
              {payLoading ? (
                <>
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
                  verifying your payment please wait...
                </>
              ) : (
                <div className={styles.paymentContent}>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/79952-successful.gif"
                    width="120"
                    height="120"
                    layout="intrinsic"
                    alt="animation"
                  />

                  <p>
                    OrderId: {showPayDetails.orderId}
                    {copy.copy1 ? (
                      <BsClipboardCheck />
                    ) : (
                      <BsClipboardPlus
                        onClick={() => {
                          navigator.clipboard.writeText(
                            ` OrderId: {showPayDetails.orderId}`
                          );

                          setCopy({ ...copy, copy1: true });
                        }}
                      />
                    )}
                  </p>
                  <p>
                    PaymentId: {showPayDetails.paymentId}
                    {copy.copy2 ? (
                      <BsClipboardCheck />
                    ) : (
                      <BsClipboardPlus
                        onClick={() => {
                          navigator.clipboard.writeText(
                            ` PaymentId: ${showPayDetails.paymentId}`
                          );
                          setCopy({ ...copy, copy2: true });
                        }}
                      />
                    )}
                  </p>
                  <p>{showPayDetails.msg}</p>
                  <p className={styles.redirect}>
                    redirecting you in {redirectSeconds} seconds....
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {copy.copy1 || copy.copy2 ? (
          <Toast content="successfully copied" />
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default CartPage;
// CartPage.getInitialProps = async (ctx) => {
//   // const { token, USER } = nextCookie(ctx);
//   // return {
//   //   initialName: USER,
//   //   token: token,
//   // };
// };
