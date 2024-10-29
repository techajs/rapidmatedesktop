import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";


const PickupNotificationSettings = () => {
  const [isPushNotificationChecked, setIsPushNotificationChecked] = useState(true);
  const [isPromotionalEmailChecked, setIsPromotionalEmailChecked] = useState(false);

  const handlePushNotificationChange = () => {
    setIsPushNotificationChecked(!isPushNotificationChecked);
    // Additional logic for push notifications toggle
  };

  const handlePromotionalEmailChange = () => {
    setIsPromotionalEmailChecked(!isPromotionalEmailChecked);
    // Additional logic for promotional emails toggle
  };

  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          <div className={Styles.addressBookAddressCard}>
            <p className={Styles.addressBookHeaderTitleText}>Notifications</p>
            <button className={Styles.addressBookPlusIconBtn}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <div>
            <div className={Styles.pickupPushNotificationEnableCard}>
              <p className={Styles.pickupPushNotificationSettings}>Receive push notifications</p>
              <Form>
                <Form.Check
                  type="switch"
                  id="push-notification-switch"
                  checked={isPushNotificationChecked}
                  onChange={handlePushNotificationChange}
                  className={isPushNotificationChecked ? Styles.pushNotificationsSwitch : ""}
                />
              </Form>
            </div>

            <div className={Styles.pickupPushNotificationEnableCard}>
              <p className={Styles.pickupPushNotificationSettings}>Receive promotional emails</p>
              <Form>
                <Form.Check
                  type="switch"
                  id="promotional-email-switch"
                  checked={isPromotionalEmailChecked}
                  onChange={handlePromotionalEmailChange}
                  className={isPromotionalEmailChecked ? Styles.promotionalEmailSwitch : ""}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PickupNotificationSettings;
