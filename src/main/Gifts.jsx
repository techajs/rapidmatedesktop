import React from "react";
import { HomeHeader, HomeFooter } from "../common/pages";
import Styles from "../assets/css/Gifts.module.css";
import GiftsBanner from "../assets/images/Gifts-Banner.png";
import SpecializedDeliveries from "../assets/images/Specialized-Delivery.png";
import ScheduledBag from "../assets/images/giftsScheduled-BagCard.png";
import GiftsNotes from "../assets/images/GiftsCoustomNotes.png";
import GiftsTracking from "../assets/images/GiftsLiveTracking.png";

const Gifts = () => {
  return (
    <>
      {/* Header Start Here  */}
      <HomeHeader />
      {/* Header End Here  */}

      <section className={Styles.giftsSection}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-7">
              <div className={Styles.giftsBannerTitleTextCard}>
                <h2>Gifts</h2>
              </div>
            </div>

            <div className="col-md-5">
              <div>
                <img
                  className={Styles.giftsTopBannerCard}
                  src={GiftsBanner}
                  alt="bannerImg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.giftsShiftDeliveryMainCard}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.giftsShiftDeliveryTitleCard}>
                <h2>Specialized Delivery</h2>
                <p>Deliver fragile or valuable gift items with utmost care</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.giftsShiftDeliveryBannerCard}>
                <img src={SpecializedDeliveries} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.giftsMultipleDeliveryOptionsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.giftsShiftDeliveryBannerCard}>
                <img src={ScheduledBag} alt="img" />
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.giftsShiftDeliveryTitleCard}>
                <h2>Same-Day & Scheduled Options</h2>
                <p>
                  Whether it's a last-minute gift or a scheduled delivery, we
                  have you covered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.giftsMultipleDeliveryOptionsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.giftsMultipleDeliveryOptionsTitleCard}>
                <h2>Custom Notes & Instructions</h2>
                <p>
                  Add personalized instructions for your delivery boy to ensure
                  smooth handling.
                </p>
              </div>
              <div className={Styles.giftsMultipleDeliveryOptionsBannerCard}>
                <img src={GiftsNotes} alt="img" />
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

      <section className={Styles.giftsMultipleDeliveryOptionsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.giftsMultipleDeliveryOptionsTitleCard}>
                <h2>Live Tracking & Updates</h2>
                <p>
                  Real-time notifications to track your gifts until they reach
                  the recipient
                </p>
              </div>
              <div className={Styles.giftsLiveTrackingBannerCard}>
                <img src={GiftsTracking} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section start here  */}
      <HomeFooter />
    </>
  );
};

export default Gifts;
