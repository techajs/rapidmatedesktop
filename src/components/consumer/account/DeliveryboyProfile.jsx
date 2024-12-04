import React, { useEffect, useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLocationDot,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import WalletLogo from "../../../assets/images/Wallet-Logo.png";
import PayPal from "../../../assets/images/PayPal-Logo.png";
import MasterCard from "../../../assets/images/MasterCard-Logo.png";
import PickupAddPaymentMethodsModal from "./PickupAddPaymentMethodsModal";
import { useSelector } from "react-redux";
import { getConsumerWallet } from "../../../data_manager/dataManage";
import Calender from "../../../assets/images/Calender-Icon.png";
const DeliveryboyProfile = () => {
  const user = useSelector((state) => state?.auth?.user.userDetails);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  return (
    <section className={Styles.profileChooseSec}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={`${Styles.chooseProfileCard} text-center`}>
              <h2 className={Styles.chooseProfileHeading}>
                Delivery preferance
              </h2>
              <p className={Styles.chooseProfileSubheading}>
                Select how would you like to work?
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className={`${Styles.deliveryboyProfileTypeMainCard} ${
                selectedCard === "shift" ? "selected" : ""
              }`}
              onClick={() => handleCardClick("shift")}
            >
              <div className="Deliveryboy-profiletypeImgCard">
                <img
                  className="deliveryboy-profileTypeImg"
                  src={Calender}
                  alt="Calender"
                />
              </div>
              <div>
                <h4 className="deliveryboy-profiletypeText">Shift wise</h4>
                <p className="deliveryboy-profileTypeDiscription">
                  You will set your availability for a time period on select
                  days
                </p>
              </div>
              <div className="deliveryboy-profiletypeCircleCard">
                <div
                  className={`deliveryboy-profileTypeCircle ${
                    selectedCard === "shift" ? "checked" : ""
                  }`}
                >
                  {selectedCard === "shift" && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryboyProfile;
