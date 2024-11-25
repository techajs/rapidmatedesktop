import React from "react";
import Styles from "../../assets/css/home.module.css";
import Approved from "../../assets/images/Booking-Approved.png";
import Celebration from "../../assets/images/Celebration-Bg.png";
import Logo from "../../assets/images/Logo-icon.png";
import { Link } from "react-router-dom";

const EnterpriseScheduleApproved = () => {
  return (
    <>
      <section className={Styles.enterpriseScheduleApprovedSec}>
        <div className="container">
          <div>
            <a className={Styles.logoCard} href="#">
              <img className={Styles.logo} src={Logo} alt="Rapidmate Logo" />
              <h2 className={Styles.companyName}>Rapidmate</h2>
            </a>
          </div>
          <div className={Styles.row}>
            <div className={Styles.colMd12}>
              <div className={Styles.deliveryboyThankyoumainCard}>
                <div>
                  <div className={Styles.deliveryboyThankyouLoaderImgCard}>
                    <img
                      className={Styles.deliveryboyScheduleApprovedImg}
                      src={Approved}
                      alt="Approved"
                    />
                  </div>
                  <div>
                    <h4 className={Styles.deliveryboyThankyouSignupText}>
                      Thank you for signing up
                    </h4>
                    <p className={Styles.deliveryboyThankyouSignupDiscription}>
                      We are reviewing your request and we will update you about
                      it shortly.
                    </p>

                    <div className={Styles.deliveryboyThankyouSignupBtnCard}>
                      <Link
                        to=""
                        className={Styles.pickupSignupContinueBtn}
                        type="button"
                      >
                        Ok
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterpriseScheduleApproved;
