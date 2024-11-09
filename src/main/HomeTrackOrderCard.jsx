import React from "react";
import Styles from "../assets/css/home.module.css";

const HomeTrackOrderCard = ({ title, description, imageSrc }) => {
  return (
    <section className={Styles.homeTrackYourOrderSec}>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className={Styles.homeTrackYourOrderTitle}>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <img
                className={Styles.homeTrackYourOrderImage}
                src={imageSrc}
                alt="Track Order in Real Time"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTrackOrderCard;
