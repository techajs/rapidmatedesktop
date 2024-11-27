import React from "react";
import { Link } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import ShiftCalender from "../../assets/images/CreateShift-Calender.png";
import Track from "../../assets/images/Track-Order-CreateShift.png";
import Package from "../../assets/images/One-TimePackage-big.png";
import Home from "../../assets/images/home-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/home.module.css";

const EnterpriseShiftSelectLocation = () => {
  const company = [
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      name: "North Street Franchise",
      address: "North Street, ABC",
    },
  ];

  return (
    <>
      {/* Header Start Here */}
      <CommonHeader />
      {/* Header End Here */}
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
                    src={ShiftCalender}
                    alt="Img"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className={Styles.enterpriseNewScheduletypeMainCard}>
                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  Select company location
                </h4>

                <div className={Styles.enterpriseOneTimeCompanyLocMainCard}>
                  {company.map((company, index) => (
                    <Link
                      key={index}
                      to="/enterprise-shift-selectservice"
                    >
                      <div className={Styles.enterpriseOneTimeCompanyLocCard}>
                        <img
                          className={Styles.enterpriseOneTimeHomeIcon}
                          src={Home}
                          alt="icon"
                        />
                        <h4 className={Styles.enterpriseOneTimeCompanyName}>
                          {company.name}
                        </h4>
                        <div
                          className={Styles.enterpriseOneTimeCompanyAddressCard}
                        >
                          <FontAwesomeIcon
                            className={Styles.enterpriseOneTimeLocDot}
                            icon={faLocationDot}
                          />
                          <p className={Styles.enterpriseOneTimeCompanyAddress}>
                            {company.address}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterpriseShiftSelectLocation;
