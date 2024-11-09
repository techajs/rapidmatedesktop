import React from "react";
import OnDemandImage from "../assets/images/OnDemandImage.png";
import Styles from "../assets/css/home.module.css";

const HomeOnDemandCard = () => {
  return (
    <>
      <section className={Styles.OnDemandDeliverySec}>
        <div className={`${Styles.manageRow} row`}>
          <div className="col-md-6">
            <div className={Styles.onDemandDeliveryTitleDiv}>
              <h2>On-Demand Delivery Solutions for Everyone</h2>
              <p>
                Whether you’re an individual, restaurant, or enterprise,
                Rapidmate offers flexible, reliable, and secure delivery
                services.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div>
              <img
                className={Styles.onDemandDeliveryImage}
                src={OnDemandImage}
                alt="On-Demand Delivery"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeOnDemandCard;
