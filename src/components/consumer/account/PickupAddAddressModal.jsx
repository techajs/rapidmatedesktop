import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import modalCss from "../../../assets/css/PickupEditAddress.module.css";
import Styles from "../../../assets/css/home.module.css";

function PickupAddAddressModal({ show, handleClose }) {
  const handleSaveChanges = () => {
    // Implement save changes logic here, if needed
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <div className={modalCss.modalPickupEditAddressHeader}>
            <p className={modalCss.vehicleDimensionsTextHead}>Add New Address</p>
            <FontAwesomeIcon
              className={modalCss.modalCloseHeaderBtn}
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
                    <Form.Label className={Styles.addPickupDetailFormLabels}>
                      Address
                    </Form.Label>
                    <Form.Control
                      className={Styles.addPickupDetailsInputs}
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
                      <Form.Label className={Styles.addPickupDetailFormLabels}>
                        First name*
                      </Form.Label>
                      <Form.Control
                        className={Styles.addPickupDetailsInputs}
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
                      <Form.Label className={Styles.addPickupDetailFormLabels}>
                        Last name
                      </Form.Label>
                      <Form.Control
                        className={Styles.addPickupDetailsInputs}
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
                    <Form.Label className={Styles.addPickupDetailFormLabels}>
                      Company
                    </Form.Label>
                    <Form.Control
                      className={Styles.addPickupDetailsInputs}
                      type="text"
                      placeholder="Type here.."
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12">
                  <Form.Group className="mb-1" controlId="formPlaintext">
                    <Form.Label className={Styles.addPickupDetailFormLabels}>
                      Phone number
                    </Form.Label>
                    <div className={Styles.pickupSignupContainer}>
                      <Form.Select
                        className={Styles.selectNumberByCountry}
                        aria-label="Default select example"
                      >
                        <option value="1">+33</option>
                        <option value="2">+91</option>
                        <option value="3">+11</option>
                      </Form.Select>
                      <Form.Control
                        className={`password-field ${Styles.signupUserName}`}
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
                    <Form.Label className={Styles.addPickupDetailFormLabels}>
                      Email
                    </Form.Label>
                    <Form.Control
                      className={Styles.addPickupDetailsInputs}
                      type="email"
                      placeholder="Type here.."
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12">
                  <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlTextarea6"
                  >
                    <Form.Label className={Styles.addPickupDetailFormLabels}>Example textarea</Form.Label>
                    <Form.Control className={Styles.addPickupDetailsInputs} as="textarea" placeholder="Type here.." rows={3} />
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
              <button className={modalCss.pickupEditAddressSaveBtn} onClick={handleSaveChanges}>Save</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PickupAddAddressModal;
