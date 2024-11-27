import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Styles from "../../assets/css/home.module.css";
import ScheduleImg from "../../assets/images/schedule-calender.png";
import OneTime from "../../assets/images/One-TimePackage.png";
import Calender from "../../assets/images/Calender-withBg.png";
import CalenderClock from "../../assets/images/Calender-Clock.png";
import CommonHeader from '../../common/CommonHeader';
import { UseFetch } from '../../utils/UseFetch';

function EnterprisesNewSchedule() {
  const {user} =UseFetch()
  return (
    <>
    <CommonHeader userData={user}/>
    <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <div className={Styles.enterpriseNewScheduleTitleCard}>
                <div>
                  <h4 className={Styles.enterpriseNewScheduleText}>New schedule</h4>
                  <p className={Styles.enterpriseNewScheduleDiscription}>
                    Let’s create new schedule for one time or for multiple hours
                  </p>
                </div>
                <div>
                  <img
                    className={Styles.enterpriseNewScheduleImg}
                    src={ScheduleImg}
                    alt="Img"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className={Styles.enterpriseNewScheduletypeMainCard}>
                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  Select the type of schedule
                </h4>
                <div className={Styles.enterpriseNewScheduleMainLinkCards}>
                  <Link
                    to="/enterprises-onetime-selectlocation"
                    className={Styles.enterpriseNewScheduleLinkCard}
                  >
                    <img
                      className={Styles.enterpriseNewScheduleOneTimeImg}
                      src={OneTime}
                      alt="icon"
                    />
                    <div>
                      <h4 className={Styles.enterpriseNewScheduleDeliveryTitle}>
                        One time delivery
                      </h4>
                      <p className={Styles.enterpriseNewScheduleDeliveryDiscription}>
                        Avail any service for fixed time and location
                      </p>
                    </div>
                    <FontAwesomeIcon
                      className={Styles.enterpriseNewScheduleRightArrow}
                      icon={faArrowRight}
                    />
                  </Link>

                  <Link
                    to="/enterprises-multiple-deliveries-selectlocation"
                    className={Styles.enterpriseNewScheduleLinkCard}
                  >
                    <img
                      className={Styles.enterpriseNewScheduleCalenderImg}
                      src={Calender}
                      alt="icon"
                    />
                    <div>
                      <h4 className={Styles.enterpriseNewScheduleDeliveryTitle}>
                        Multiple deliveries
                      </h4>
                      <p className={Styles.enterpriseNewScheduleDeliveryDiscription}>
                        Repeat single delivery for multiple days
                      </p>
                    </div>
                    <FontAwesomeIcon
                      className={Styles.enterpriseNewScheduleRightArrow}
                      icon={faArrowRight}
                    />
                  </Link>

                  <Link
                    to="/enterprise-shift-selectlocation"
                    className={Styles.enterpriseNewScheduleLinkCard}
                  >
                    <img
                      className={Styles.enterpriseNewScheduleCalenderImg}
                      src={CalenderClock}
                      alt="icon"
                    />
                    <div>
                      <h4 className={Styles.enterpriseNewScheduleDeliveryTitle}>
                        Create shift
                      </h4>
                      <p className={Styles.enterpriseNewScheduleDeliveryDiscription}>
                        Avail any service for a time slot with multiple hours
                      </p>
                    </div>
                    <FontAwesomeIcon
                      className={Styles.enterpriseNewScheduleRightArrow}
                      icon={faArrowRight}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EnterprisesNewSchedule
