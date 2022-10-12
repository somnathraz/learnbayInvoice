import React, { useEffect, useState } from "react";
import styles from "./FirstSection.module.css";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Popup from "../../Popup/Popup";
import Form from "../../Form/Form";
import { BsArrowRightCircleFill } from "react-icons/bs";

const FirstSection = ({
  deskTopPara,
  title,
  spanTitleText,
  desc,
  dataScience,
  mTopPara,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
}) => {
  const [mobile, setMobile] = useState(false);
  const [show, setShow] = useState(false);
  const [popups, setPopups] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [spaceBetween, setSpaceBetween] = useState(70);

  const popupShow = () => {
    setPopups(true);
  };
  const showMenu = () => {
    setShow(!show);
  };

  useEffect(() => {
    let width = window.innerWidth;

    if (width < 801) {
      setSlidesPerView(3);
      setSpaceBetween(20);
    }
    if (width < 481) {
      setMobile(true);
    }
  }, [setSlidesPerView]);

  return (
    <section className={styles.wrapper}>
      <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="leftPopup">
          <div className="whiteP" />
        </div>
        <div className="RightPopup">
          <h5>Apply For Counselling</h5>
          <p>Fill the below Details to get started</p>
          <Form
            popup={true}
            setTrigger={setPopups}
            dataScience={dataScience}
            redirectDs={redirectDs}
            redirectFs={redirectFs}
            redirectBa={redirectBa}
            redirectBl={redirectBl}
            redirectDe={redirectDe}
          />
        </div>
      </Popup>
      <div className={styles.left}>
        {mobile ? (
          <p className="pTop">{mTopPara}</p>
        ) : (
          <p className="pTop">{deskTopPara}</p>
        )}

        <h1>
          {title}
          <span> {spanTitleText}</span>
        </h1>
        <p className={styles.pBot}>{desc}</p>
        <div className={styles.btnWrapper}>
          <button onClick={popupShow}>
            Apply for Counselling <BsArrowRightCircleFill />
          </button>
          <div className={styles.mobileDivWrapper}>
            <div className={styles.first}>
              <h5>500+</h5>
              <p>Hiring Partners</p>
            </div>
            <div className={styles.second}>
              <h5>150%</h5>
              <p>Salary hike</p>
            </div>
            <div className={styles.third}>
              <h5>15 lac</h5>
              <p>Avg CTC*</p>
            </div>
          </div>
        </div>
        <p className={styles.hPara}>Our Hiring Partner</p>
        <div className={styles.bottom}>
          <Swiper
            spaceBetween={mobile ? 30 : spaceBetween}
            centeredSlides={true}
            slidesPerView={mobile ? 3 : slidesPerView}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {mobile ? (
              <>
                {" "}
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Google.webp"
                    alt="Google"
                    width={mobile ? "90" : "150"}
                    height="40"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Amazon.png"
                    alt="Google"
                    width="120"
                    height="40"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Microsoft.png"
                    alt="Google"
                    width="120"
                    height="40"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Flipkart.png"
                    alt="Flipkart"
                    width="120"
                    height="40"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/PAYTM_logo.png"
                    alt="Paytm"
                    width="80"
                    height="28"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/facebook.png"
                    alt="Facebook Logo"
                    objectFit="contain"
                    width="120"
                    height="80"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/TCS.png"
                    alt="TCS"
                    width="120"
                    height="40"
                    loading="lazy"
                  />
                </SwiperSlide>
              </>
            ) : (
              <>
                {" "}
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Google.webp"
                    alt="Google"
                    width="80"
                    height="40"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Amazon.png"
                    alt="Google"
                    width="120"
                    height="40"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Microsoft.png"
                    alt="Google"
                    width="150"
                    height="40"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/facebook.png"
                    alt="facebook"
                    width="150"
                    height="40"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/PAYTM_logo.png"
                    alt="Paytm"
                    width="140"
                    height="44"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Zoho.png"
                    alt="Zoho"
                    width="140"
                    height="48"
                    loading="lazy"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/TCS.png"
                    alt="TCS"
                    width="150"
                    height="60"
                    loading="lazy"
                  />
                </SwiperSlide>
              </>
            )}
          </Swiper>
        </div>
      </div>
      <div className={styles.right}>
        <img
          src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Data-science-course.webp"
          alt="data-science-course"
        />
      </div>
    </section>
  );
};

export default FirstSection;
