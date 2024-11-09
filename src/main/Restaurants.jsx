import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeHeader, HomeFooter } from '../common/pages';
import Styles from "../assets/css/Restaurant.module.css";
import RestaurantBanner from "../assets/images/Restaurants-Banner.png";
import ShiftDelivery from "../assets/images/ShiftDeliveryCard.png";
import ImmediateRequests from "../assets/images/ImmediateRequestsImg.png";
import ScheduledRequests from "../assets/images/ScheduledRequestsImg.png";
import Tracking from "../assets/images/RealTimeTracking-Banner.png";
import Feedback from "../assets/images/Restaurant-Feedback.png";
import Phone from "../assets/images/Coordination-Phone.png";
import OrderPreview from "../assets/images/OrderPreview-BannerImg.png";

const feedbackData = [
  { id: 1, image: Feedback, text: "Lorem ipsum dolor sit amet..." },
  { id: 2, image: Feedback, text: "Lorem ipsum dolor sit amet..." },
  { id: 3, image: Feedback, text: "Lorem ipsum dolor sit amet..." },
];

const Restaurants = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      <HomeHeader />

      <section className={Styles.restaurantsSection}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-7">
            <div className={Styles.restaurantBannerTitleTextCard}>
              <h2>Restaurants</h2>
            </div>
          </div>
          <div className="col-md-5">
            <div>
              <img
                className={Styles.restaurantsTopBannerCard}
                src={RestaurantBanner}
                alt="Restaurant Banner"
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.restaurantsShiftDeliveryMainCard}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.restaurantsShiftDeliveryBannerCard}>
                <img src={ShiftDelivery} alt="Shift Delivery" layout="responsive" />
              </div>
            </div>
            <div className="col-md-6">
              <div className={Styles.restaurantsShiftDeliveryTitleCard}>
                <h2>Shift-based Delivery Service</h2>
                <p>Hire dedicated delivery boys for fixed shifts, ensuring consistent service for your customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.restaurantsScheduledMainSec}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-6">
            <div className={Styles.restaurantsImmediateRequestsCard}>
              <h2>Immediate Requests</h2>
              <img src={ImmediateRequests} alt="Immediate Requests" layout="responsive" />
            </div>
          </div>
          <div className="col-md-6">
            <div className={Styles.restaurantsScheduledRequestsCard}>
              <h2>Scheduled Requests</h2>
              <img src={ScheduledRequests} alt="Scheduled Requests" layout="responsive" />
            </div>
          </div>
          <div className={Styles.restaurantsScheduledDeliveryDescriptionMainCard}>
            <div className={Styles.restaurantsScheduledDeliveryDescriptionCard}>
              <p>Schedule delivery staff in advance or request them to meet peak-time demand.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.restaurantsRealTimeTrackingSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.restaurantsRealTimeTrackingTextCard}>
                <h2>Real-Time Tracking</h2>
                <p>Keep an eye on deliveries with live tracking updates sent directly to your dashboard.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={Styles.restaurantsRealTimeTrackingImageCard}>
                <img src={Tracking} alt="Real-Time Tracking" layout="responsive" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.restaurantsProfileFeedbackSec}>
        <div className="container">
          <div className="row">
            <div className={Styles.restaurantsProfileFeedbackTitleCard}>
              <h2>Profile & Feedback</h2>
              <p>Check detailed profiles of assigned delivery personnel and provide feedback to improve service quality.</p>
            </div>
            <div className="col-md-12">
              <Slider {...settings}>
                {feedbackData.map((item) => (
                  <div key={item.id}>
                    <div className={Styles.restaurantsDriverFeedbackMainCard}>
                      <div className={Styles.restaurantsDriverFeedbackImgCard}>
                        <img src={item.image} alt="Feedback" layout="responsive" />
                      </div>
                      <div className={Styles.restaurantsDriverFeedbackDescriptionTextCard}>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.restaurantsSeamlessCoordinationSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className={Styles.restaurantsSeamlessCoordinationTitleCard}>
                <h2>Seamless Coordination</h2>
                <p>Delivery boys can receive on-the-way orders, making the process more efficient.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={Styles.restaurantsSeamlessCoordinationBannerCard}>
                <img src={Phone} alt="Coordination Phone" layout="responsive" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.restaurantsSchedulePreviewSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={Styles.restaurantsSchedulePreviewBannerCard}>
                <img src={OrderPreview} alt="Order Preview" layout="responsive" />
              </div>
            </div>
            <div className="col-md-8">
              <div className={Styles.restaurantsSchedulePreviewTitleCard}>
                <h2>Log-in/Log-out Tracking</h2>
                <p>Monitor when delivery boys start and finish their shifts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </>
  );
};

export default Restaurants;
