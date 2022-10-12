import React from "react";
import styles from "./Footer.module.css";
import {
  AiFillFacebook,
  AiFillYoutube,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillLinkedin,
} from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { FaAndroid } from "react-icons/fa";
import Image from "next/image";
import { BiRss } from "react-icons/bi";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.firstFooter}>
        <div className={styles.iconWrapper}>
          <h5>Follow us!</h5>
          <div className={styles.sIcon}>
            <a href="https://www.facebook.com/SkillSlash-100623872122442">
              <AiFillFacebook className={styles.FIcon} />
            </a>
            <a href="https://www.instagram.com/skillslash_Academy/">
              <AiFillInstagram className={styles.FIcon} />
            </a>
            <a href="https://www.youtube.com/c/Skillslash">
              <AiFillYoutube className={styles.FIcon} />
            </a>
            <a href="https://twitter.com/skillslash">
              <AiFillTwitterSquare className={styles.FIcon} />
            </a>
            <a href="https://www.linkedin.com/company/skillslash">
              <AiFillLinkedin className={styles.FIcon} />
            </a>
          </div>
        </div>
        <div className={styles.fPages}>
          <h5>Pages</h5>
          <Link href="/About" passHref>
            <p>About</p>
          </Link>
          <Link href="/blog" passHref>
            <p>Blog</p>
          </Link>
          <Link href="/Contact-us" passHref>
            <p>Contact</p>
          </Link>
        </div>
        <div className={styles.FJoin}>
          <h5>Join us</h5>
          <p>Become an Instructor</p>
          <p>Hire from Skillslash</p>
        </div>
        <div className={styles.FApp}>
          <h5>Download Our App</h5>
          <p>
            <FaAndroid />
            Get the android app
          </p>
        </div>
      </div>
      <hr />
      <div className={styles.secondFooter}>
        <h5>Our Office are located at</h5>
        <div className={styles.officeWrapper}>
          <div>
            <h5>Bengaluru</h5>
            <p>
              Skillslash Pvt Ltd, Level 8, Umiya Business Bay, Tower 1, Cessna
              Business Bay, Marathahalli ORR, Bengaluru, 560103
            </p>
            <a href="https://www.google.com/maps/place/Skillslash/@12.934427,77.694266,13z/data=!4m5!3m4!1s0x0:0x454e4c9c26cfc3f8!8m2!3d12.9344271!4d77.6942656?hl=en">
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Bengaluru-office-location-google-map.webp"
                width="325"
                height="186"
                alt="bangalore-office-skilslash"
                layout="intrinsic"
              />
            </a>
          </div>
          <div>
            <h5>Mumbai</h5>
            <p>
              Skillslash Pvt Ltd, Level 2, B, Andheri Kurla Road, Wing, Times
              Square, Unit 1, Andheri East Mumbai, Maharashtra 400059
            </p>
            <a href="https://www.google.com/maps/place/Skillslash/@19.106737,72.882517,13z/data=!4m5!3m4!1s0x0:0x7c5440708ff6a610!8m2!3d19.1067368!4d72.8825239?hl=en">
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Mumbai-office-location-google-map.webp"
                width="325"
                height="186"
                alt="Mumbai-office-skilslash"
                layout="intrinsic"
              />
            </a>
          </div>
          <div>
            <h5>Hyderabad</h5>
            <p>
              Skillslash Pvt Ltd, Level 2, iLabs Centre, Oval Building, Plot
              no.18, Inorbit Mall Rd, HITEC City Hyderabad, 500081
            </p>
            <a href="https://www.google.com/maps/place/Skillslash/@17.4324482,78.3872514,15z/data=!4m5!3m4!1s0x0:0x1022d0491cb5a1a3!8m2!3d17.4324642!4d78.3872631">
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Hyderabad-office-location-google-map.webp"
                width="325"
                height="186"
                alt="Hyderabad-office-skilslash"
                layout="intrinsic"
              />
            </a>
          </div>
          <div>
            <h5>Gurugram</h5>
            <p>
              Skillslash Pvt Ltd, 10th floor, Tower-B Unitech Cyber Park, Sector
              39 Gurugram, Haryana 122003
            </p>
            <a href="https://www.google.com/maps?ll=28.443899,77.059831&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=15937668011988298987">
              <Image
                src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/web/Bengaluru-office-location-google-map.webp"
                width="325"
                height="186"
                alt="Gurugram-office-skilslash"
                layout="intrinsic"
              />
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.thirdFooter}>
        <h5>Top Industry demand programs</h5>
        <div className={styles.linksWrap}>
          <Link
            href="/advanced-data-science-and-ai-course-with-real-work-experience"
            passHref
          >
            <span>Advanced Data Science and AI Course |</span>
          </Link>
          <Link href="/business-analytics-course" passHref>
            <span>Business Analytics online Training |</span>
          </Link>

          <Link href="/block-chain-course" passHref>
            <span>Blockchain program and certification |</span>
          </Link>
          <Link href="/full-stack-developer-course" passHref>
            <span>Full Stack Developer course with certification</span>
          </Link>
        </div>
        <div className={styles.terms}>
          <Link href="/terms-of-use" passHref>
            <span>
              <GoPrimitiveDot />
              Terms of Use
            </span>
          </Link>
          <Link href="/privacy-statement" passHref>
            <span>
              <GoPrimitiveDot />
              Privacy Policy
            </span>
          </Link>
          <Link href="/refunds-cancellation" passHref>
            <span>
              <GoPrimitiveDot />
              Refund Policy
            </span>
          </Link>
          <Link href="/job-guarantee-terms-and-conditions" passHref>
            <span>
              <GoPrimitiveDot />
              Job Guarantee Terms and Conditions
            </span>
          </Link>
        </div>
        <p>© 2019-2021 – Skillslash. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
