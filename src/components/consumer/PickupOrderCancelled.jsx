import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import SadEmoji from "../../assets/images/SadFace-Emoji.png";
import Styles from  "../../assets/css/PickupCancellationModal.module.css";

import { Link } from "react-router-dom";

function PickupOrderCancelled({ show, handleClose }) {
    const handleSaveChanges = () => {
        // Implement save changes logic here, if needed
        handleClose();
      };

      return (
        <>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
              <div className={Styles.modalCancellationHeader}>
                <p className={Styles.orderCanceledTextHead}>Order cancelled</p>
                <FontAwesomeIcon  className={Styles.modalCloseHeaderBtn} icon={faTimes} onClick={handleClose} />
              </div>
            </Modal.Header>
            <Modal.Body>
               <div className={Styles.orderCanceledMainCard}>
                  <img className={Styles.orderCanceledSadEmoji} src={SadEmoji} alt="Emoji" />
                  <div>
                    <h6 className={Styles.yourOrderCancelText}>Your order is cancelled</h6>
                    <p className={Styles.orderCanceledMsg}>Sorry for the inconvenience, hope to see you soon!</p>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <div>
                  <Link to="/consumer/pickup-ordertracking" className={Styles.cancellationModalSubmitBtn}>Ok</Link>
               </div>
            </Modal.Footer>
          </Modal>
        </>
      )
}

export default PickupOrderCancelled