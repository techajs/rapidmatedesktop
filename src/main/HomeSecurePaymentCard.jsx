import React from "react";
import Styles from "../assets/css/home.module.css";

const HomeSecurePaymentCard = ({ title, description, imageSrc }) => {
  return (
    <>
      <section className={Styles.homeEfficientCardSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div>
                <img
                  className={Styles.homeEfficientCardImage}
                  src={imageSrc}
                  alt="Shift-Based Delivery"
                />
              </div>
            </div>

            <div className="col-md-8">
              <div className={Styles.homeEfficientCardTitle}>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSecurePaymentCard;
