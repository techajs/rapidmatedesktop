import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../../assets/css/PickupEditAddress.module.css";
import homeStyle from "../../../assets/css/home.module.css";

function PickupEditAddressModal({ show, handleClose }) {
  const handleSaveChanges = () => {
    // Implement save changes logic here, if needed
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <div className={Styles.modalPickupEditAddressHeader}>
            <p className={Styles.vehicleDimensionsTextHead}>Edit address</p>
            <FontAwesomeIcon
              className={Styles.modalCloseHeaderBtn}
              icon={faTimes}
              onClick={handleClose}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row">
              <div className="col-md-12">
                <div>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={homeStyle.addPickupDetailFormLabels}>
                      Address
                    </Form.Label>
                    <Form.Control
                      className={homeStyle.addPickupDetailsInputs}
                      type="text"
                      placeholder="Type here.."
                    />
                  </Form.Group>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group
                      className="mb-1"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label className={homeStyle.addPickupDetailFormLabels}>
                        First name*
                      </Form.Label>
                      <Form.Control
                        className={homeStyle.addPickupDetailsInputs}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group
                      className="mb-1"
                      controlId="exampleForm.ControlInput3"
                    >
                      <Form.Label className={homeStyle.addPickupDetailFormLabels}>
                        Last name
                      </Form.Label>
                      <Form.Control
                        className={homeStyle.addPickupDetailsInputs}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="col-md-12">
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label className={homeStyle.addPickupDetailFormLabels}>
                      Company
                    </Form.Label>
                    <Form.Control
                      className={homeStyle.addPickupDetailsInputs}
                      type="text"
                      placeholder="Type here.."
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12">
                  <Form.Group className="mb-1" controlId="formPlaintext">
                    <Form.Label className={homeStyle.addPickupDetailFormLabels}>
                      Phone number
                    </Form.Label>
                    <div className={homeStyle.pickupSignupContainer}>
                      <Form.Select
                        className={homeStyle.selectNumberByCountry}
                        aria-label="Default select example"
                      >
                        <option value="1">+33</option>
                        <option value="2">+91</option>
                        <option value="3">+11</option>
                      </Form.Select>
                      <Form.Control
                        className={`password-field ${homeStyle.signupUserName}`}
                        type="text"
                        placeholder="0 00 00 00 00"
                      />
                    </div>
                  </Form.Group>
                </div>

                <div className="col-md-12">
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput5"
                  >
                    <Form.Label className={homeStyle.addPickupDetailFormLabels}>
                      Email
                    </Form.Label>
                    <Form.Control
                      className={homeStyle.addPickupDetailsInputs}
                      type="email"
                      placeholder="Type here.."
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12">
                  <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className={homeStyle.addPickupDetailFormLabels}>Example textarea</Form.Label>
                    <Form.Control className={Styles.addPickupDetailsInputs} as="textarea" placeholder="Type here.." rows={3} />
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
              <button className={Styles.pickupEditAddressDeleteBtn}>Delete</button>
              <button className={Styles.pickupEditAddressSaveBtn} onClick={handleSaveChanges}>Save</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PickupEditAddressModal;
