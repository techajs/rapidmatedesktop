import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PickupChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          <div className={Styles.addressBookAddressCard}>
            <p className={Styles.addressBookHeaderTitleText}>Change password</p>
            {/* <button className="addressBook-plusIconBtn">
              <FontAwesomeIcon icon={faPlus} />
            </button> */}
          </div>

          <div>
            <div>
              <Form>
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className={Styles.pickupChangePasswordLabelText}>
                    Before setting up a new password, please confirm your
                    current password
                  </Form.Label>
                  <div className={Styles.pickupChangePasswordCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupChangePasswordLockIcon}
                      icon={faLock}
                    />
                    <Form.Control
                      className={Styles.pickupChangePasswordInputs}
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Current password"
                    />
                    <FontAwesomeIcon
                      className={Styles.pickupChangePasswordEyeIcon}
                      icon={showCurrentPassword ? faEye : faEyeSlash}
                      onClick={() => togglePasswordVisibility("current")}
                    />
                  </div>
                </Form.Group>
                <div className={Styles.changepasswordLinkCard}>
                  <Link className={Styles.changePasswordForgotPassword}>
                    Forgot your password?
                  </Link>
                </div>

                <Form.Group
                  className="mb-1"
                >
                  <Form.Label className={Styles.pickupChangePasswordLabelText}>
                    Use at least 12 characters, mixing uppercase, lowercase,
                    numbers, and symbols.
                  </Form.Label>
                  <div className={`${Styles.pickupChangePasswordCard} mb-3`}>
                    <FontAwesomeIcon
                      className={Styles.pickupChangePasswordLockIcon}
                      icon={faLock}
                    />
                    <Form.Control
                      className={Styles.pickupChangePasswordInputs}
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New password"
                    />
                    <FontAwesomeIcon
                      className={Styles.pickupChangePasswordEyeIcon}
                      icon={showNewPassword ? faEye : faEyeSlash}
                      onClick={() => togglePasswordVisibility("new")}
                    />
                  </div>

                  <div className={Styles.pickupChangePasswordCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupChangePasswordLockIcon}
                      icon={faLock}
                    />
                    <Form.Control
                      className={Styles.pickupChangePasswordInputs}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                    />
                    <FontAwesomeIcon
                      className={Styles.pickupChangePasswordEyeIcon}
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                      onClick={() => togglePasswordVisibility("confirm")}
                    />
                  </div>
                </Form.Group>
              </Form>

              <div className={Styles.pickupUpdatePasswordCard}>
                <button className={Styles.pickupUpdatePasswordBtn}>
                  Update password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PickupChangePassword;
