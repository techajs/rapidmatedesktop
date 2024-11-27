import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLocationDot,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import MapCard from "../../../assets/images/DummuMap-Card.png";
import EnterpriseAddNewLocationsModal from "../common/EnterpriseAddNewLocationsModal";

const EnterpriseManageCompanyLocations = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const companylocations = [
    {
      id: 1,
      company: "North Street Franchise",
      address: "North Street, ABC",
    },
    {
      id: 2,
      company: "North Street Franchise",
      address: "North Street, ABC",
    },
  ];

  return (
    <section className={Styles.enterprisenewScheduleSec}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={Styles.addressBookAddressCard}>
              <p className={Styles.addressBookHeaderTitleText}>
                Manage company locations
              </p>
              <button 
                onClick={openModal}
                className={Styles.addressBookPlusIconBtn}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            {companylocations.map((address, index) => (
              <div
                key={index}
                className={Styles.enterpriseManagecompanyLocationsmainCard}
              >
                <img
                  className={Styles.enterpriseManagecompanyLocationsMapcard}
                  src={MapCard}
                  alt="Map"
                />
                <div className={Styles.enterpriseManagecompanyLocationAddressMainCard}>
                  <div>
                    <h4 className={Styles.enterpriseManagecompanyLocationCompanyName}>
                      {address.company}
                    </h4>
                    <div className={Styles.enterpriseManagecompanyLocationAddressCard}>
                      <FontAwesomeIcon
                        className={Styles.enterpriseManagecompanyLocationAddressIcon}
                        icon={faLocationDot}
                      />
                      <p className={Styles.enterpriseManagecompanyLocationAddressText}>
                        {address.address}
                      </p>
                    </div>
                  </div>
                  <button className={Styles.enterpriseManagecompanyLocationAddressEditIcon}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modals */}
      <EnterpriseAddNewLocationsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </section>
  );
};

export default EnterpriseManageCompanyLocations;
