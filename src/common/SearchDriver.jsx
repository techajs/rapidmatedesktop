import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import Styles from "../assets/css/home.module.css";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import DriverCircle from "../assets/images/DriverBackgroun-Circle.png";
import DriverProfiles from "../assets/images/DriverLoader-Profiles.png";
import PickupCancellationReasonModal from "./PickupCancellationReasonModal";
const SearchDriver = () => {
  const  navigate= useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
   
    // Here you can call your API to confirm the payment or update order status.
  }, []);


  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.lookingDriverSection}>
      <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div className={Styles.driverCancelCard}>
                  <button className={Styles.driverCancelModalBtn} onClick={openModal}>
                    Cancel request
                  </button>
                </div>
                <div className={Styles.driverBackgroundMiddleCard}>
                  <img
                    className={Styles.backgroundDriverCircle}
                    src={DriverCircle}
                    alt="Icon"
                  />
                  <div className={Styles.DriverProfileCardMainBg}>
                    <img
                      className={Styles.backgroundDriverCircleProfiles}
                      src={DriverProfiles}
                      alt="Icon"
                    />
                    <h1 className={Styles.lookingDriverText}>Looking for driver</h1>
                    <p className={Styles.lookingDriverSubText}>
                      please wait, we are looking for a driver to pick up and
                      deliver your order..
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PickupCancellationReasonModal
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      </section>
    
    </>
  );
};

export default SearchDriver;
