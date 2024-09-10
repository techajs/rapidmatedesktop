import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Styles from "../assets/css/PasswordModal.module.css"
import Logo from "../assets/images/Logo-icon.png";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ForgotPasswordOTPModal from "./ForgotPasswordOTPModal";

const ForgotPasswordEmailModal = ({ show, handleClose }) => {
  const [showOtpModal, setShowOtpModal] = useState(false); // State to manage ResetPasswordModal visibility

  const handleShowOtpModal = () => setShowOtpModal(true);
  const handleCloseOtpModal = () => setShowOtpModal(false);

  const handleEmailSubmit = () => {
    // Handle email submission logic here
    // For demo purposes, let's just open the ResetPasswordModal and close the current modal
    handleShowOtpModal();
    handleClose();
  };

  return (
    <>
    <div className="forgotPassword-modalMain">
      <Modal
        show={show}
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
              Please confirm your email address, we will send OTP there
            </p>
          </div>

          <div>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className={Styles.loginLabels}>Email</Form.Label>
                <Form.Control
                  className={Styles.loginInputs}
                  type="email"
                  placeholder="Type here.."
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className={Styles.modalSubmitBtnCard}>
            <button
              className={Styles.modalEmailSubmitBtn}
              onClick={handleEmailSubmit}
              type="button"
            >
              Submit
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Render OtpModal conditionally based on showOtpModal state */}
      {showOtpModal && (
        <ForgotPasswordOTPModal
          show={showOtpModal}
          handleClose={handleCloseOtpModal}
        />
      )}
      </div>
    </>
  );
};

export default ForgotPasswordEmailModal;
