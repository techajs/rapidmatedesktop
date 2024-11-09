import React, { useState } from "react";
import { Link } from "react-router-dom";
import CurvyBorder from "../assets/images/curvy-border.png";
import HomeBanner from "../assets/images/Home-main-banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faComment } from "@fortawesome/free-regular-svg-icons";
import Styles from "../assets/css/home.module.css";
import ContactModal from "../common/ContactModal";

const HomeBannerCard = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <>
      {/* modal start here  */}
      <ContactModal show={showModal} handleClose={handleClose} />
      <section className={Styles.homeSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.homeInfoCard}>
                <h1 className={Styles.homeTitle}>
                  Your delivery & moving partner, in one tap
                </h1>
                <img
                  className={Styles.borderCurvy}
                  src={CurvyBorder}
                  alt="border"
                />
                <p className={Styles.homeDiscription}>
                  Are you tired of the hassle and stress of ordering food,
                  requesting couriers, or moving to a new home? Look no further
                  than Rapidmate! Our app is designed to make your life easier
                  by providing a one-stop solution for all your delivery and
                  moving needs.
                </p>
                <div className={Styles.homeActionBtns}>
                  <Link className={Styles.trailButton} to="/">
                    Try free trial
                  </Link>
                  <a className={Styles.demoBtn} href="#">
                    <FontAwesomeIcon
                      className={Styles.playIcon}
                      icon={faCirclePlay}
                    />
                    <p className={Styles.demoPlay}>View Demo</p>
                  </a>

                  <button className={Styles.GetInTouchBtn} onClick={handleShow}>
                    <FontAwesomeIcon
                      className={Styles.commentIcon}
                      icon={faComment}
                    />
                    <p className={Styles.demoPlay}>Get in touch</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.bannerCard}>
                <img
                  className={Styles.homeBanner}
                  src={HomeBanner}
                  alt="banner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBannerCard;
