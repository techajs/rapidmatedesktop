import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClock } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Styles from  "../../assets/css/PickupNotificationModal.module.css";
import { Link } from "react-router-dom";

function EnterpriseNotificationModal({ show, handleClose }) {
  const handleSaveChanges = () => {
    // Implement save changes logic here, if needed
    handleClose();
  };

  const NotificationInfo = [
    {
      title: "Delivery En Route",
      discription:
        "Your package is on its way to the destination, Track its progress!",
      time: "09:30 AM",
    },
    {
      title: "Delivery En Route",
      discription:
        "Your package is on its way to the destination, Track its progress!",
      time: "09:30 AM",
    },
    {
      title: "Delivery En Route",
      discription:
        "Your package is on its way to the destination, Track its progress!",
      time: "09:30 AM",
    },
    {
      title: "Delivery En Route",
      discription:
        "Your package is on its way to the destination, Track its progress!",
      time: "09:30 AM",
    },
  ];

  return (
    <>
    <div>
      <Modal className="pickupNotification-modalMain" show={show} onHide={handleClose}>
        <Modal.Header>
          <div className={`${Styles.pickupNotificationHeader}`}>
            <p className={Styles.pickupnotificationTitle}>Notifications</p>
            <button
              onClick={handleClose}
              className={Styles.pickupNotificationClearBtn}
            >
              Clear all
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            {NotificationInfo.map((info, index) => (
              <div key={index} className={Styles.pickupNotificationModalCard}>
                <FontAwesomeIcon
                  className={Styles.pickupNotificationNotificationBell}
                  icon={faBell}
                />
                <div>
                  <h4 className={Styles.pickupNotificationDeliveryStatus}>
                    {info.title}
                  </h4>
                  <p className={Styles.pickupNotificationDeliverydiscription}>
                    {info.discription}
                  </p>
                  <div className={Styles.pickupNotificationClockTimeCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupNotificationClockIcon}
                      icon={faClock}
                    />
                    <p className={Styles.pickupNotificationDeliveryTime}>
                      {info.time}
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon
                  className="pickupNotification-NotificationClose"
                  icon={faX}
                />
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Link to="/enterprises-notification" className="pickupNotification-SeeallBtn">See all</Link>
          </div>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

export default EnterpriseNotificationModal;
