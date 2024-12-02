import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import Styles from  "../assets/css/PickupCancellationModal.module.css";
import PickupOrderCancelled from "../components/consumer/PickupOrderCancelled";


function PickupCancellationReasonModal({ show, handleClose }) {
  const [selectedReason, setSelectedReason] = useState("");
  const [showOrderCancelModal, setOrderCancelModal] = useState(false); // State to manage ResetPasswordModal visibility

  const handleShowOrderCancelModal = () => setOrderCancelModal(true);
  const handleCloseCancelModal = () => setOrderCancelModal(false);

  const handleReasonSubmit = () => {
    // Handle email submission logic here
    // For demo purposes, let's just open the ResetPasswordModal and close the current modal
    handleShowOrderCancelModal();
    handleClose();
  };

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  const handleSaveChanges = () => {
    // Implement save changes logic here, if needed
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <div className={Styles.modalCancellationHeader}>
            <p className={Styles.cancellationReasonText}>Cancellation reason</p>
            <FontAwesomeIcon  className={Styles.modalCloseHeaderBtn} icon={faTimes} onClick={handleClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div
              className={`${Styles.cancellationReasonCard} ${selectedReason === "changeOfPlans" ? Styles.selected : ""}`}
              onClick={() => handleReasonSelect("changeOfPlans")}
            >
              <div className={Styles.cancellationModalReasonCircle}>{selectedReason === "changeOfPlans" && <FontAwesomeIcon className="reasonCancellation-CheckIcon" icon={faCheck} />}</div>
              <p className={Styles.cancellationReasonTextDetails}>Change of plans</p>
            </div>

            <div
              className={`${Styles.cancellationReasonCard} ${selectedReason === "changeDeliveryTime" ? Styles.selected : ""}`}
              onClick={() => handleReasonSelect("changeDeliveryTime")}
            >
              <div className={Styles.cancellationModalReasonCircle}>{selectedReason === "changeDeliveryTime" && <FontAwesomeIcon className="reasonCancellation-CheckIcon" icon={faCheck} />}</div>
              <p className={Styles.cancellationReasonTextDetails}>
                I want to change delivery time
              </p>
            </div>

            <div
              className={`${Styles.cancellationReasonCard} ${selectedReason === "incorrectAddress" ? Styles.selected : ""}`}
              onClick={() => handleReasonSelect("incorrectAddress")}
            >
              <div className={Styles.cancellationModalReasonCircle}>{selectedReason === "incorrectAddress" && <FontAwesomeIcon className="reasonCancellation-CheckIcon" icon={faCheck} />}</div>
              <p className={Styles.cancellationReasonTextDetails}>
                Incorrect address or information
              </p>
            </div>

            <div
              className={`${Styles.cancellationReasonCard} ${selectedReason === "foundAnotherPerson" ? Styles.selected : ""}`}
              onClick={() => handleReasonSelect("foundAnotherPerson")}
            >
              <div className={Styles.cancellationModalReasonCircle}>{selectedReason === "foundAnotherPerson" && <FontAwesomeIcon className="reasonCancellation-CheckIcon" icon={faCheck} />}</div>
              <p className={Styles.cancellationReasonTextDetails}>
                Found another person
              </p>
            </div>

            <div
              className={`${Styles.cancellationReasonCard} ${selectedReason === "takingTooLong" ? Styles.selected : ""}`}
              onClick={() => handleReasonSelect("takingTooLong")}
            >
              <div className={Styles.cancellationModalReasonCircle}>{selectedReason === "takingTooLong" && <FontAwesomeIcon className={Styles.reasonCancellationCheckIcon} icon={faCheck} />}</div>
              <p className={Styles.cancellationReasonTextDetails}>
                It is taking too long
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
           <div>
              <button onClick={handleReasonSubmit} className={Styles.cancellationModalSubmitBtn}>Submit</button>
           </div>
        </Modal.Footer>
      </Modal>
      {/* Render OtpModal conditionally based on showOtpModal state */}
      {showOrderCancelModal && (
        <PickupOrderCancelled
          show={showOrderCancelModal}
          handleClose={handleCloseCancelModal}
        />
      )}
    </>
  );
}

export default PickupCancellationReasonModal;