import { useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import Logo from "../assets/images/Logo-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "../assets/css/PasswordModal.module.css";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const ResetPasswordModal = ({ isShow, handleClose, email, otp }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleNewPassword = () => {
    setNewPassword((prevState) => !prevState);
  };

  const toggleConfirmPassword = () => {
    setConfirmPassword((prevState) => !prevState);
  };
  return (
    <Modal
      show={isShow} // Toggle visibility based on isShow
      onHide={handleClose}
      centered
      dialogClassName="modal-main"
    >
      <Modal.Header>
        <div className={Styles.modalMainHeader}>
          <FontAwesomeIcon
            className={Styles.modalBackClose}
            onClick={handleClose}
            icon={faArrowLeft}
          />
          <div className={Styles.logoHeaderMainCard}>
            <div className={Styles.logoHeaderCard}>
              <img className={Styles.logoSmall} src={Logo} alt="Logo" />
            </div>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className={Styles.forgotTitleHeaderCard}>
          <h2 className={Styles.forgotPasswordTitle}>Reset Password</h2>
          <p className={Styles.forgotPasswordSubtitle}>
            Thanks you for confirming the code, you may now reset the password.
          </p>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label className={Styles.loginLabels}>New Password</Form.Label>
            <div className={Styles.passwordInputContainer}>
              <Form.Control
                className={Styles.loginInputs}
                type={newPassword ? "text" : "password"}
                placeholder="Type here.."
                aria-label="New Password"
              />
              <FontAwesomeIcon
                icon={newPassword ? faEye : faEyeSlash}
                className={Styles.eyeIcon}
                onClick={toggleNewPassword}
                aria-label={newPassword ? "Hide password" : "Show password"}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label className={Styles.loginLabels}>
              Confirm Password
            </Form.Label>
            <div className={Styles.passwordInputContainer}>
              <Form.Control
                className={Styles.loginInputs}
                type={confirmPassword ? "text" : "password"}
                placeholder="Type here.."
                aria-label="Confirm Password"
              />
              <FontAwesomeIcon
                icon={confirmPassword ? faEye : faEyeSlash}
                className={Styles.eyeIcon}
                onClick={toggleConfirmPassword}
                aria-label={confirmPassword ? "Hide password" : "Show password"}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose} className={Styles.modalEmailSubmitBtn}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const OTPContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const OTPInputBox = styled.input`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 5px;
  ::placeholder {
    color: #aaa; /* Placeholder text color */
  }
`;

export default ResetPasswordModal;
