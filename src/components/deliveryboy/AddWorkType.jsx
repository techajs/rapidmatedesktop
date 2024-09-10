import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../assets/css/home.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import Calender from "../../assets/images/Calender-Icon.png";
import Location from "../../assets/images/Location-Icon.png";
import Both from "../../assets/images/Calender-Both.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function AddWorkType() {
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
          <div className="col-md-4">
            <div
              className={`${Styles.deliveryboyProfileTypeMainCard} ${
                selectedCard === "shift" ? Styles.selected : ""
              }`}
              onClick={() => handleCardClick("shift")}
            >
              <div className={Styles.DeliveryboyProfiletypeImgCard}>
                <img
                  className={Styles.deliveryboyProfileTypeImg}
                  src={Calender}
                  alt="Calender"
                />
              </div>
              <div>
                <h4 className={Styles.deliveryboyProfiletypeText}>Shift wise</h4>
                <p className={Styles.deliveryboyProfileTypeDiscription}>
                  You will set your availability for a time period on select
                  days
                </p>
              </div>
              <div className={Styles.deliveryboyProfiletypeCircleCard}>
                <div
                  className={`${Styles.deliveryboyProfileTypeCircle} ${
                    selectedCard === "shift" ? Styles.checked: ""
                  }`}
                >
                  {selectedCard === "shift" && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className={`${Styles.deliveryboyProfileTypeMainCard} ${
                selectedCard === "pickup" ? Styles.selected : ""
              }`}
              onClick={() => handleCardClick("pickup")}
            >
              <div className={Styles.DeliveryboyProfiletypeImgCard}>
                <img
                  className={Styles.deliveryboyProfileTypeImgLoc}
                  src={Location}
                  alt="Location-Icon"
                />
              </div>
              <div>
                <h4 className={Styles.deliveryboyProfiletypeText}>
                  Pickup & dropoff
                </h4>
                <p className={Styles.deliveryboyProfileTypeDiscription}>
                  Accept deliveries any time of the day
                </p>
              </div>
              <div className={Styles.deliveryboyProfiletypeCircleCard}>
                <div
                  className={`${Styles.deliveryboyProfileTypeCircle} ${
                    selectedCard === "pickup" ? Styles.checked : ""
                  }`}
                >
                  {selectedCard === "pickup" && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className={`${Styles.deliveryboyProfileTypeMainCard} ${
                selectedCard === "both" ?  Styles.selected : ""
              }`}
              onClick={() => handleCardClick("both")}
            >
              <div className={Styles.DeliveryboyProfiletypeImgCard}>
                <img
                  className={Styles.deliveryboyProfileTypeImg}
                  src={Both}
                  alt="Both-Icon"
                />
              </div>
              <div>
                <h4 className={Styles.deliveryboyProfiletypeText}>Both</h4>
                <p className={Styles.deliveryboyProfileTypeDiscription}>
                  Work as shift wise and pickup/dropoff both
                </p>
              </div>
              <div className={Styles.deliveryboyProfiletypeCircleCard}>
                <div
                  className={`${Styles.deliveryboyProfileTypeCircle} ${
                    selectedCard === "both" ? Styles.checked : ""
                  }`}
                >
                  {selectedCard === "both" && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </div>
              </div>
            </div>
          </div>

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
