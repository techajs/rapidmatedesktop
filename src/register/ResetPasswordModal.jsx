import { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components"; // Ensure this is imported
import Logo from "../assets/images/Logo-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "../assets/css/PasswordModal.module.css";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { maskEmail } from "../utils/Constants";

const ResetPasswordModal = ({ isShow, handleClose,email,otp }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  console.log(isShow)

  

  return (
    <>
      {/* Forgot Password Modal */}
      <Modal
        show={isShow} // Hide when ResetPasswordModal is shown
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
            <h2 className={Styles.forgotPasswordTitle}>Forgot password</h2>
            <p className={Styles.forgotPasswordSubtitle}>
              We have sent a 6 digit code to your email address{" "}
              
            </p>
          </div>


          <div className={Styles.resendCodeCard}>
            <button className={Styles.resendCodeBtn} type="button">
              Resend code
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className={Styles.modalSubmitBtnCard}>
            <button
              className={Styles.modalEmailSubmitBtn}
              type="button"
            >
              Submit
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      
    </>
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
