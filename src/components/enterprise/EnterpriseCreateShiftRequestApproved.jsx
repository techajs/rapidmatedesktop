import React, { useState } from "react";
import Styles from "../../assets/css/home.module.css";
import Track from "../../assets/images/Track-Order-Shift-Approved.png";
import CreateShift from "../../assets/images/CreateShift-Calender.png";
import Loader from "../../assets/images/Signup-Loader.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";

const EnterpriseCreateShiftRequestApproved = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {/* Header Start Here  */}
      <CommonHeader />
      {/* Header End Here  */}
      <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <div className={Styles.enterpriseNewScheduleTitleCard}>
                <div>
                  <h4 className={Styles.enterpriseNewScheduleText}>
                    Create shift
                  </h4>
                  <img
                    className={Styles.enterpriseCreateShiftTrackImg}
                    src={Track}
                    alt="img"
                  />
                </div>
                <div>
                  <img
                    className={Styles.enterpriseCreateShiftImg}
                    src={CreateShift}
                    alt="Img"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div
                className={Styles.enterpriseCreateShiftRequestLoaderMainCard}
              >
                <div
                  className={Styles.enterpriseCreateShiftRequestLoaderImageCard}
                >
                  <img
                    className={Styles.enterpriseCreateShiftRequestLoaderImage}
                    src={Loader}
                    alt="loader"
                  />
                </div>
                <h4 className={Styles.enterpriseCreateShiftRequestSubmitText}>
                  Schedule request submitted
                </h4>
                <p
                  className={
                    Styles.enterpriseCreateShiftRequestSubmitDiscription
                  }
                >
                  We are reviewing your request and we will notify you soon via
                  email or phone call
                </p>
              </div>
              <div className={Styles.enterpriseCreateShiftRequestSubmitBtnCard}>
                <Link
                  to=""
                  className={Styles.enterpriseCreateShiftRequestSubmitBtn}
                >
                  Ok
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterpriseCreateShiftRequestApproved;
