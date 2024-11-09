import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeHeader, HomeFooter } from '../common/pages';
import Styles from "../assets/css/Grocery.module.css";
import GroceryBanner from "../assets/images/Grocery-Banner.png";
import EfficientDeliveries from "../assets/images/Efficient-DeliveryImage.png";
import MultipleDelivery from "../assets/images/MultipleDeliveryBanner.png";
import Tracking from "../assets/images/OrderHistory-TrackingBanner.png";
import Feedback from "../assets/images/Restaurant-Feedback.png";

const feedbackData = [
  {
    id: 1,
    image: Feedback,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim",
  },
  {
    id: 2,
    image: Feedback,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim",
  },
  {
    id: 3,
    image: Feedback,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim",
  },
];

const Grocery = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Header Start Here  */}
      <HomeHeader />
      {/* Header End Here  */}
      <section className={Styles.grocerySection}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-7">
            <div className={Styles.groceryBannerTitleTextCard}>
              <h2>Grocery</h2>
            </div>
          </div>

          <div className="col-md-5">
            <div>
              <img
                className={Styles.groceryTopBannerCard}
                src={GroceryBanner}
                alt="bannerImg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.groceryShiftDeliveryMainCard}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.groceryShiftDeliveryBannerCard}>
                <img src={EfficientDeliveries} alt="img" />
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.groceryShiftDeliveryTitleCard}>
                <h2>Quick and Efficient Deliveries</h2>
                <p>
                  Ensure fast, reliable deliveries for your customers with
                  real-time tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.groceryMultipleDeliveryOptionsSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.groceryMultipleDeliveryOptionsTitleCard}>
                <h2>Multiple Delivery Options</h2>
                <p>
                  Handle one-time deliveries or multiple deliveries with ease,
                  even scheduling recurring ones for weekly or monthly orders.
                </p>
              </div>
              <div className={Styles.groceryMultipleDeliveryOptionsBannerCard}>
                <img src={MultipleDelivery} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.groceryRealTimeTrackingSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.groceryRealTimeTrackingTextCard}>
                <h2>Order History & Tracking</h2>
                <p>
                  Review past deliveries, check statuses, and ensure that
                  everything is delivered on time.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.groceryRealTimeTrackingImageCard}>
                <img src={Tracking} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.groceryProfileFeedbackSec}>
        <div className="container">
          <div className="row">
            <div>
              <div className={Styles.groceryProfileFeedbackTitleCard}>
                <h2>Customer Satisfaction</h2>
                <p>
                  Collect feedback from customers after each delivery for
                  continuous improvement.
                </p>
              </div>
            </div>

            <div className="col-md-12">
              <Slider {...settings}>
                {feedbackData.map((feedbackData) => (
                  <div key={feedbackData.id}>
                    <div className={Styles.groceryDriverFeedbackMainCard}>
                      <div className={Styles.groceryDriverFeedbackImgCard}>
                        <img src={feedbackData.image} alt="img" />
                      </div>
                      <div className={Styles.groceryDriverFeedbackDescriptionTextCard}>
                        <p>{feedbackData.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section start here  */}
      <HomeFooter />
    </>
  );
};

export default Grocery;
