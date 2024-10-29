import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import modalCss from "../../../assets/css/PickupEditAddress.module.css";
import Styles from "../../../assets/css/home.module.css";

function PickupAddPaymentMethodsModal({ show, handleClose }) {
  const handleSaveChanges = () => {
    // Implement save changes logic here, if needed
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <div className={modalCss.modalPickupEditAddressHeader}>
            <p className={Styles.vehicleDimensionsTextHead}>Add payment methods</p>
            <FontAwesomeIcon
              className="modalClose-HeaderBtn"
              icon={faTimes}
              onClick={handleClose}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>

          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PickupAddPaymentMethodsModal;
