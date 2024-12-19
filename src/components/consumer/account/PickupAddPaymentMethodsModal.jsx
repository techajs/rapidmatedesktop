import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import modalCss from "../../../assets/css/PickupEditAddress.module.css";
import Styles from "../../../assets/css/home.module.css";

function PickupAddPaymentMethodsModal({ show, handleClose }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!cardNumber || !/^[0-9]{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (!cardHolderName || cardHolderName.trim() === "") {
      newErrors.cardHolderName = "Cardholder name is required.";
    }

    if (!expirationDate || !/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expirationDate)) {
      newErrors.expirationDate = "Expiration date must be in MM/YY format.";
    }

    if (!cvv || !/^[0-9]{3,4}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = () => {
    if (validateFields()) {
      console.log("Card Details:", {
        cardNumber,
        cardHolderName,
        expirationDate,
        cvv,
      });
      handleClose();
    } else {
      alert("Please correct the errors in the form.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <div className={modalCss.modalPickupEditAddressHeader}>
          <p style={{fontSize: 14, fontWeight: 600, margin: 0,}}>
            Add Payment Methods
          </p>
          <FontAwesomeIcon
            className="modalClose-HeaderBtn"
            icon={faTimes}
            onClick={handleClose}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              isInvalid={!!errors.cardNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cardNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCardHolderName">
            <Form.Label>Cardholder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter cardholder name"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              isInvalid={!!errors.cardHolderName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cardHolderName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formExpirationDate">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/YY"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              isInvalid={!!errors.expirationDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.expirationDate}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              isInvalid={!!errors.cvv}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cvv}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button style={{ backgroundColor: '#FFC72B', borderColor: '#FFC72B' }} onClick={handleSaveChanges}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PickupAddPaymentMethodsModal;
