import React from "react";
import { HomeHeader, HomeFooter } from "../common/pages";
import Styles from "../assets/css/Ecommerce.module.css";
import EcommerceBanner from "../assets/images/E-commerce-Banner.png";
import MultipleDelivery from "../assets/images/MultipleDeliveryBanner.png";
import PharmacyOrderTracking from "../assets/images/Pharmacy-OrderTracking.png";
import Integration from "../assets/images/integration-image.png";
import MiltipleDeliveryPoints from "../assets/images/MiltipleDeliveryPoints.png";

const Ecommerce = () => {
  return (
    <>
      {/* Header Start Here */}
      <HomeHeader />
      {/* Header End Here */}
      
      <section className={Styles.EcommerceSection}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-7">
            <div className={Styles.EcommerceBannerTitleTextCard}>
              <h2>E-commerce</h2>
            </div>
          </div>

          <div className="col-md-5">
            <div>
              <img
                className={Styles.EcommerceTopBannerCard}
                src={EcommerceBanner}
                alt="bannerImg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.EcommerceMultipleDeliveryOptionsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.EcommerceMultipleDeliveryOptionsBannerCard}>
                <img src={Integration} alt="img" />
              </div>
              <div className={Styles.EcommerceMultipleDeliveryOptionsTitleCard}>
                <h2>Seamless Integration</h2>
                <p>
                  Perfect for online stores looking for efficient,
                  cost-effective delivery solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.EcommerceRealTimeTrackingSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.EcommerceRealTimeTrackingImageCard}>
                <img src={MiltipleDeliveryPoints} alt="img" />
              </div>
            </div>
            <div className="col-md-6">
              <div className={Styles.EcommerceRealTimeTrackingTextCard}>
                <h2>Multiple Delivery Points</h2>
                <p>
                  Handle single or multiple drop-offs with ease, catering to
                  various customers in one go
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.EcommerceCustomDeliverySchedulingSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.EcommerceCustomDeliverySchedulingTitleCard}>
                <h2>Custom Delivery Scheduling</h2>
                <p>
                  Schedule recurring deliveries for frequent customers or
                  high-demand periods
                </p>
              </div>
              <div className={Styles.EcommerceCustomDeliverySchedulingBannerCard}>
                <img src={MultipleDelivery} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.EcommerceRealTimeTrackingSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.EcommerceRealTimeTrackingTextCard}>
                <h2>Live Order Tracking</h2>
                <p>
                  Real-time updates allow customers to track their medications
                  from dispatch to delivery.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.EcommerceRealTimeTrackingImageCard}>
                <img src={PharmacyOrderTracking} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.giftsVehicleWideaMainCard}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.giftsVehicleWideaTitleCard}>
                <h2>Wide Range of Vehicles</h2>
                <p>
                  Choose from bicycles, scooters, or cars depending on the size
                  and value of the gift
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer Section start here */}
      <HomeFooter />
    </>
  );
};

export default Ecommerce;
