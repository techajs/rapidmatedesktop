import React, { useState } from "react";
import Styles from "../assets/css/home.module.css";
import Payment from "../assets/images/Payment-Successful-Icon.png";
import { Link } from "react-router-dom";

const PaymentSuccessful = () => {
  return (
    <>
      <section className={Styles.deliveryboyThankyouSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.deliveryboyThankyoumainCard}>
                <div>
                  <div className={Styles.deliveryboyThankyouLoaderImgCard}>
                    <img
                      className={Styles.PaymentSuccessfulImage}
                      src={Payment}
                      alt="Payment-Img"
                    />
                  </div>
                  <div>
                    <h4 className={Styles.deliveryboyThankyouSignupText}>
                      Payment Successful!
                    </h4>
                    <p className={Styles.deliveryboyThankyouSignupDiscription}>
                      Your payment was successful, let’s look for a delivery boy
                      now...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentSuccessful;
