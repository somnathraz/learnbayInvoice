import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import { IoCartOutline } from "react-icons/io5";

const Product = (props) => {
  const {
    data: { id, name, price, image, desc, spanT, bHeading },
  } = props;

  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className={styles.card}>
      <Image src={image} alt={name} height="540" width="540" />
      <div className={styles.pInfo}>
        <div className={styles.headingDiv}>
          <h3>
            {name}
            <span>{spanT}</span>
          </h3>
          <p className={styles.blHeading}>{bHeading}</p>
        </div>
        <div className={styles.productInfo}>
          <p className={styles.ProductInfoHead}>Product Info</p>
          <p className={styles.ProductDesc}>{desc}</p>
        </div>
        <div className={styles.priceSection}>
          <button
            onClick={() => {
              dispatch(addToCart(props.data));
              router.push("/cart");
            }}
          >
            <IoCartOutline className={styles.cartIcon} />
            Add to card
          </button>
          <p className={styles.ProductPrice}>
            ₹ {price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
