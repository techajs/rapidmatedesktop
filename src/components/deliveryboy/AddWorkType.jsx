import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/home.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import Calender from "../../assets/images/Calender-Icon.png";
import Location from "../../assets/images/Location-Icon.png";
import Both from "../../assets/images/Calender-Both.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UseFetch } from "../../utils/UseFetch";
function AddWorkType() {
  const { lookup } = UseFetch();
  const [selectedCard, setSelectedCard] = useState(null);
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const baseUrl = role?.toLowerCase().replace(/_/g, "");
  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  return (
    <section className={Styles.profileChooseSec}>
      <div className="container">
        <div>
          <Link
            className={Styles.logoCard}
            to={!isAuthenticated && !role ? "/" : `/${baseUrl}/add-work-type`}
          >
            <img className={Styles.logo} src={Logo} alt="logo" />
            <h2 className={Styles.companyName}>Rapidmate</h2>
          </Link>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className={Styles.chooseProfileCard}>
              <h2 className={Styles.chooseProfileHeading}>
                How would you like to work?
              </h2>
              <p className={Styles.chooseProfileSubheading}>
                You can change this in settings later
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {lookup?.workType.map((worktype, index) => (
            <div key={index} className="col-md-4">
              <div
                className={`${Styles.deliveryboyProfileTypeMainCard} ${
                  selectedCard === worktype.work_type ? Styles.selected : ""
                }`}
                onClick={() => handleCardClick(worktype.work_type)}
              >
                <div className={Styles.DeliveryboyProfiletypeImgCard}>
                  <img
                    className={Styles.deliveryboyProfileTypeImg}
                    src={Calender}
                    alt="Calender"
                  />
                </div>
                <div>
                  <h4 className={Styles.deliveryboyProfiletypeText}>
                    {worktype.work_type}
                  </h4>
                  <p className={Styles.deliveryboyProfileTypeDiscription}>
                    {worktype.work_type_desc}
                  </p>
                </div>
                <div className={Styles.deliveryboyProfiletypeCircleCard}>
                  <div
                    className={`${Styles.deliveryboyProfileTypeCircle} ${
                      selectedCard === worktype.work_type ? Styles.checked : ""
                    }`}
                  >
                    {selectedCard === worktype.work_type && (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-5">
            <Link
              to="/deliveryboy/dashboard"
              className={Styles.pickupSignupContinueBtn}
              type="button"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddWorkType;
