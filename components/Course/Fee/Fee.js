import React, { useState, useEffect } from "react";
import styles from "./Fee.module.css";
import Image from "next/image";
import { MdCheckCircle } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import Popup from "../../Popup/Popup";
import Form from "../../Form/Form";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Fee = ({
  changeFee,
  desc,
  desc1,
  BasicPrice,
  BasicDesc,
  ProPrice,
  ProDesc,
  ProMaxPrice,
  ProMaxDesc,
  dataScience,
  redirectDs,
  redirectFs,
  redirectDe,
  redirectBa,
  redirectBl,
  proProduct,
  proMaxProduct,
  jobProduct,
  productData,
  showProducts,
}) => {
  const [popups, setPopups] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [spaceBetween, setSpaceBetween] = useState(70);

  const popupShow = () => {
    setPopups(true);
  };
  useEffect(() => {
    let width = window.innerWidth;

    if (width < 801) {
      setSlidesPerView(9);
      setSpaceBetween(20);
    }
    if (width < 641) {
      setSlidesPerView(5);
      setSpaceBetween(20);
    }
    if (width < 481) {
      setSlidesPerView(3);
      setSpaceBetween(10);
      setMobile(true);
    }
  }, [setSlidesPerView]);

  return (
    <div className={styles.FeeS}>
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
      <p className="pTop"> Finance</p>
      <h4>Program Fees & Financing</h4>

      <div className={styles.feeWrapperTop}>
        <span>
          <p className="pBotS">{desc}</p>

          <h5>Payment Partners</h5>
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
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/liquiloans.webp"
                      alt="liqiloans"
                      width={mobile ? "90" : "150"}
                      height="40"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/propelld.webp"
                      alt="Propelled"
                      width="120"
                      height="40"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/zest-logo.webp"
                      alt="zest"
                      width="80"
                      height="20"
                    />
                  </SwiperSlide>
                </>
              ) : (
                <>
                  <SwiperSlide>
                    <Image
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/liquiloans.webp"
                      alt="liqiLoans"
                      width="300"
                      height="120"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/propelld.webp"
                      alt="propelld"
                      width="500"
                      height="200"
                      layout="intrinsic"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/zest-logo.webp"
                      alt="Zest"
                      width="200"
                      height="58"
                    />
                  </SwiperSlide>
                </>
              )}
            </Swiper>
          </div>
        </span>
        <span></span>
      </div>

      {changeFee ? (
        <div className={styles.priceTableData}>
          <div className={styles.first}>
            <span className={styles.Price}>Program Features</span>

            <span className={styles.PFeatures}>Job Assistance</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Live Class Subscription</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>LMS Subscription</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Job Referrals</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Industry Projects</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Capstone Projects</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Domain Training</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              Project Certification from Companies
            </span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              Job Guarantee<span>(T&C apply)</span>
            </span>

            <span className={styles.PFeatures}>
              <FiArrowRight className={styles.Arrow} />
            </span>
          </div>
          <div className={styles.fourth}>
            <div className={styles.firstDivInn}>
              <span className={styles.sub}>Basic</span>
              <span className={styles.Price}>{BasicPrice}</span>
              <span className={styles.desc}>{BasicDesc}</span>
              <span className={styles.PFeatures}>
                <MdCheckCircle className={styles.check} />
              </span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>1 Year</span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>Lifetime</span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>3+</span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>7+</span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>1</span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>
                <AiOutlineCloseCircle className={styles.cross} />
              </span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>
                <AiOutlineCloseCircle className={styles.cross} />
              </span>
              <hr className={styles.priceLine} />
              <span className={styles.PFeatures}>
                <AiOutlineCloseCircle className={styles.cross} />
              </span>
            </div>

            <span className={styles.PFeatures}>
              <button
                className={styles.button}
                onClick={() => {
                  productData(proProduct);
                  showProducts(true);
                }}
              >
                Enrol Now
              </button>
            </span>
          </div>
          <div className={styles.fourth}>
            <span className={styles.sub}>Pro</span>
            <span className={styles.Price}>{ProPrice}</span>
            <span className={styles.desc}>{ProDesc}</span>
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>3 Year</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Lifetime</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>5+</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>15+</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>3</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              <AiOutlineCloseCircle className={styles.cross} />
            </span>
            <span className={styles.PFeatures}>
              <button
                className={styles.button}
                onClick={() => {
                  productData(proMaxProduct);
                  showProducts(true);
                }}
              >
                Enrol Now
              </button>
            </span>
          </div>
          <div className={styles.fourth}>
            <span className={styles.sub}>Pro Max</span>
            <span className={styles.Price}>{ProMaxPrice}</span>
            <span className={styles.desc}>{ProMaxDesc}</span>
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>3 Year</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Lifetime</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Unlimited</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>15+</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>3</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <span className={styles.PFeatures}>
              <button
                className={styles.button}
                onClick={() => {
                  productData(jobProduct);
                  showProducts(true);
                }}
              >
                Enrol Now
              </button>
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.priceTableData}>
          <div className={styles.first}>
            <span className={styles.Price}>Program Features</span>
            <span className={styles.PFeatures}>Job Assistance</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Live Class Subscription</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>LMS Subscription</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Job Referrals</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Industry Projects</span>
            <hr className={styles.priceLine} />

            <span className={styles.PFeatures}>Domain Training</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>Project Certification</span>
            <hr className={styles.priceLine} />
            <span className={styles.PFeatures}>
              Job Guarantee<span>(T&C apply)</span>
            </span>
            <span className={styles.PFeatures}>
              <FiArrowRight className={styles.Arrow} />
            </span>
          </div>

          <div className={styles.fourth}>
            <span className={styles.sub}>Pro</span>
            <span className={styles.Price}>₹ 95,000 + GST</span>
            <span className={styles.desc}>
              Get Full Stack Software Development with real work Experience
            </span>
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <span className={styles.PFeatures}>3 Year</span>
            <span className={styles.PFeatures}>Lifetime</span>
            <span className={styles.PFeatures}>5+</span>
            <span className={styles.PFeatures}>4+</span>

            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <span className={styles.PFeatures}>
              <AiOutlineCloseCircle className={styles.cross} />
            </span>
            <span className={styles.PFeatures}>
              <button className={styles.button} onClick={popupShow}>
                Enrol Now
              </button>
            </span>
          </div>
          <div className={styles.fourth}>
            <span className={styles.sub}>Pro Max</span>
            <span className={styles.Price}>₹ 1,35,000 + GST</span>
            <span className={styles.desc}>
              Get Full Stack Software Development with 100% Job Guarantee
            </span>
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <span className={styles.PFeatures}>3 Year</span>
            <span className={styles.PFeatures}>Lifetime</span>
            <span className={styles.PFeatures}>Unlimited</span>
            <span className={styles.PFeatures}>6+</span>

            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <span className={styles.PFeatures}>
              <MdCheckCircle className={styles.check} />
            </span>
            <span className={styles.PFeatures}>
              <button className={styles.button} onClick={popupShow}>
                Enrol Now
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fee;
