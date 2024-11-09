import React from "react";
import { HomeHeader, HomeFooter } from '../common/pages';
import Styles from "../assets/css/Pharmacy.module.css";
import PharmacyBanner from "../assets/images/Pharmacy-Banner.png";
import DiscreetDeliveries from "../assets/images/Discreet-Deliveries.png";
import ImmediateRequests from "../assets/images/ImmediateRequestsImg.png";
import ScheduledRequests from "../assets/images/ScheduledRequestsImg.png";
import FeedBackDriver from "../assets/images/Restaurant-Feedback.png";
import PharmacyOrderTracking from "../assets/images/Pharmacy-OrderTracking.png";

const Pharmacy = () => {

  return (
    <>
      {/* Header Start Here  */}
      <HomeHeader />
      {/* Header End Here  */}

      <section className={Styles.pharmacySection}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-7">
            <div className={Styles.pharmacyBannerTitleTextCard}>
              <h2>Pharmacy & Meds</h2>
            </div>
          </div>

          <div className="col-md-5">
            <div>
              <img
                className={Styles.pharmacyTopBannerCard}
                src={PharmacyBanner}
                alt="bannerImg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.pharmacyShiftDeliveryMainCard}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.pharmacyShiftDeliveryBannerCard}>
                <img src={DiscreetDeliveries} alt="img" />
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.pharmacyShiftDeliveryTitleCard}>
                <h2>Secure, Discreet Deliveries</h2>
                <p>
                  Ensure medicines and healthcare products are delivered safely
                  and discreetly to customers' homes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.pharmacyScheduledMainSec}>
        <div className={`row ${Styles.manageRow}`}>
          <div>
            <div className={Styles.pharmacyScheduledDeliveryDescriptionCard}>
              <h2>Urgent & Scheduled Deliveries</h2>
              <p>
                Provide on-demand delivery for urgent medical needs or schedule
                for later.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className={Styles.pharmacyScheduledRequestsCard}>
              <img src={ImmediateRequests} alt="img" />
            </div>
          </div>

          <div className="col-md-6">
            <div className={Styles.pharmacyImmediateRequestsCard}>
              <img src={ScheduledRequests} alt="img" />
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.pharmacyMultipleDeliveryOptionsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.pharmacyMultipleDeliveryOptionsBannerCard}>
                <img src={FeedBackDriver} alt="img" />
              </div>
              <div className={Styles.pharmacyMultipleDeliveryOptionsTitleCard}>
                <h2>Professional Delivery Personnel</h2>
                <p>Delivery personnel trained to handle medical products safely.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.pharmacyRealTimeTrackingSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.pharmacyRealTimeTrackingTextCard}>
                <h2>Live Order Tracking</h2>
                <p>
                  Real-time updates allow customers to track their medications
                  from dispatch to delivery.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.pharmacyRealTimeTrackingImageCard}>
                <img src={PharmacyOrderTracking} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.pharmacyBannerSection}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-12">
            <div className={Styles.pharmacyBannerTitleCard}>
              <h2>Reliable Service</h2>
              <p>
                Trustworthy delivery ensuring that the right medications are
                delivered to the correct address.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section start here  */}
      <HomeFooter />
    </>
  );
};

export default Pharmacy;
