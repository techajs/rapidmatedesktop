import React from "react";
import { HomeHeader, HomeFooter } from "../common/pages";
import Styles from "../assets/css/AboutUs.module.css";
import OurMission from "../assets/images/OurMission-LayerImage.png";
import OurVision from "../assets/images/OurVision-ImgObject.png";
import Headphone from "../assets/images/Headphone-Vector.png";
import Delivery from "../assets/images/PrometDeliveryImage.png";
import Thumb from "../assets/images/AboutThumbhUp.png";
import Bulb from "../assets/images/About-BulbImg.png";

const AboutUs = () => {
  return (
    <>
      {/* Header Start Here  */}
      <HomeHeader />
      {/* Header End Here  */}
      <section className={Styles.aboutBannerSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.aboutBannerTitleCard}>
                <h2>Who we are?</h2>
                <p>
                  Rapidmate is a forward-thinking logistics company offering
                  versatile delivery solutions to individuals, businesses, and
                  enterprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.aboutOurMissionTitleCard}>
                <h2>Our Mission</h2>
                <p>
                  To provide efficient, reliable, and secure delivery services
                  tailored to meet diverse needs across multiple industries.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.aboutOurMissionImgCard}>
                <img src={OurMission} alt="Our Mission" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.aboutOurMissionTitleCard}>
                <h2>Our Vision</h2>
                <p>
                  To become the preferred delivery solution across industries by
                  offering innovative, flexible, and customer-centric services.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.aboutOurMissionImgCard}>
                <img src={OurVision} alt="Our Vision" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Styles.aboutStandForSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.aboutOurMissionTitleCard}>
                <h2>What We Stand For</h2>
                <p>
                  Quality service, prompt delivery, customer satisfaction, and
                  continuous innovation in the logistics industry.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className={Styles.aboutQuelityheadphoneMainCard}>
                <div className={Styles.aboutQuelityheadphoneImgCard}>
                  <img src={Headphone} alt="Quality Service" />
                </div>
                <div className={Styles.aboutQuelityheadphoneTextCard}>
                  <p>Quality service</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.aboutQuelityheadphoneMainCard}>
                <div className={Styles.aboutQuelityheadphoneImgCard}>
                  <img src={Delivery} alt="Prompt Delivery" />
                </div>
                <div className={Styles.aboutQuelityheadphoneTextCard}>
                  <p>Prompt delivery</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.aboutQuelityheadphoneMainCard}>
                <div className={Styles.aboutQuelityheadphoneImgCard}>
                  <img src={Thumb} alt="Customer Satisfaction" />
                </div>
                <div className={Styles.aboutQuelityheadphoneTextCard}>
                  <p>Customer satisfaction</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.aboutQuelityheadphoneMainCard}>
                <div className={Styles.aboutQuelityheadphoneImgCard}>
                  <img src={Bulb} alt="Innovation" />
                </div>
                <div className={Styles.aboutQuelityheadphoneTextCard}>
                  <p>Continuous innovation in the logistics industry</p>
                </div>
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

export default AboutUs;
