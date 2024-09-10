import { Modal } from "react-bootstrap";
import Logo from "../assets/images/Logo-icon.png";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ResetPasswordModal = ({ show, handleClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleNewPassword = () => {
    setNewPassword(prevState => !prevState);
  };

  const toggleConfirmPassword = () => {
    setConfirmPassword(prevState => !prevState);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="modal-main"
    >
      <Modal.Header>
        <div className="modal-main-header">
          <FontAwesomeIcon
            className="modal-back-close"
            onClick={handleClose}
            icon={faArrowLeft}
          />
          <div className="logo-header-main-card">
            <div className="logo-header-card">
              <img className="logo-small" src={Logo} alt="Logo" />
            </div>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="forgot-title-header-card">
          <h2 className="forgot-password-title">Reset Password</h2>
          <p className="forgot-password-subtitle">
            Thank you for confirming the code. You may now reset the password.
          </p>
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label className="login-labels">New Password</Form.Label>
            <div className="password-input-container">
              <Form.Control
                className="password-field login-inputs"
                type={newPassword ? "text" : "password"}
                placeholder="Type here.."
                aria-label="New Password"
              />
              <FontAwesomeIcon
                icon={newPassword ? faEyeSlash : faEye}
                onClick={toggleNewPassword}
                className="eye-icon"
                aria-label={newPassword ? "Hide password" : "Show password"}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label className="login-labels">Confirm Password</Form.Label>
            <div className="password-input-container">
              <Form.Control
                className="password-field login-inputs"
                type={confirmPassword ? "text" : "password"}
                placeholder="Type here.."
                aria-label="Confirm Password"
              />
              <FontAwesomeIcon
                icon={confirmPassword ? faEyeSlash : faEye}
                onClick={toggleConfirmPassword}
                className="eye-icon"
                aria-label={confirmPassword ? "Hide password" : "Show password"}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-submit-btn-card">
          <button
            className="modal-email-submit-btn"
            onClick={handleClose} // Close modal on submit, adjust as per your logic
            type="button" // Ensure this is type="button" to prevent form submission
          >
            Submit
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPasswordModal;
