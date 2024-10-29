import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PickupEditAddressModal from "./PickupEditAddressModal";
import PickupAddAddressModal from "./PickupAddAddressModal";
import {
  faPlus,
  faLocationDot,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
// Define user addresses as an array of objects
const userAddresses = [
  {
    id: 1,
    name: "John Doe",
    address:
      "18 Avenue Henri et Louise de Vilmorin, 91370, Verrières-le-Buisson",
  },
];
function PickupAddressBook() {
  const [showEditModal, setShowEditModal] = useState(false); 
  const [showAddModal, setShowAddModal] = useState(false);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };
  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          <div className={Styles.addressBookAddressCard}>
            <p className={Styles.addressBookHeaderTitleText}>Address book</p>
            <button
              onClick={openAddModal}
              className={Styles.addressBookPlusIconBtn}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {/* Display user addresses */}
          <div>
            {userAddresses.map((address, index) => (
              <div key={index} className={Styles.addressBookAddressesCards}>
                <div className={Styles.addressBookLocationDotIconCard}>
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  <h5 className={Styles.addressBookUserCompanyname}>
                    {address.name}
                  </h5>
                  <p className={Styles.addressBookUserCompanyAddress}>
                    {address.address}
                  </p>
                </div>
                <button
                  onClick={openEditModal}
                  className={Styles.addressBookEditPenIconCard}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
       {/* Modals */}
       <PickupEditAddressModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
      />

      <PickupAddAddressModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
    </section>
  );
}

export default PickupAddressBook;
