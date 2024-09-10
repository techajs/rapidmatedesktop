import React from "react";
import Styles from "../assets/css/home.module.css"

const WhyChooseus = () => {
  return (
    <>
      <section className={Styles.HomeWhyChooseUsSec}>
        <div className="container">
          <div className="row">
            <div className={Styles.HomeourServicesTitleMainCard}>
              <h2 className={Styles.HomeourServicesTitle}>Why choose us</h2>
            </div>
            <div className="col-md-4">
              <div className={Styles.HomeWhyChooseUsWhitebgCard}>
                <h4 className={Styles.HomeWhyChooseUsCardTitle}>
                  Easy integration with your system
                </h4>
                <p className={Styles.HomeWhyChooseUsCardDiscription}>
                  Our delivery service integrates seamlessly with your existing
                  system, ensuring a smooth transition without disrupting your
                  operations. This compatibility allows for easy order
                  management and streamlined processes, improving overall
                  efficiency
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className={Styles.HomeWhyChooseUsPrimarybgCard}>
                <h4 className={Styles.HomeWhyChooseUsCardTitle}>
                  Real-time tracking
                </h4>
                <p className={Styles.HomeWhyChooseUsCardDiscription}>
                  We provide real-time tracking for all deliveries, allowing you
                  and your customers to track order status at any time. This
                  transparency builds trust and helps you run your business more
                  efficiently by providing accurate delivery times.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className={Styles.HomeWhyChooseUsWhitebgCard}>
                <h4 className={Styles.HomeWhyChooseUsCardTitle}>
                  Efficient and on-time deliveries
                </h4>
                <p className={Styles.HomeWhyChooseUsCardDiscription}>
                  Our dedicated team ensures that all deliveries are completed
                  quickly and efficiently, minimizing delays and optimizing the
                  customer experience. We prioritize punctuality and reliability
                  so that you can maintain high service standards and customer
                  satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseus;
