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
                      Schedule request approved
                    </h4>
                    <p className={Styles.deliveryboyThankyouSignupDiscription}>
                      Congratulations, your request for new delivery schedule is
                      approved.
                    </p>

                    <div className={Styles.deliveryboyThankyouSignupBtnCard}>
                      <Link to="" className={Styles.pickupSignupContinueBtn}>
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
