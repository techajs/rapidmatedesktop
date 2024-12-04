import React, { useEffect, useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PickupEditAddressModal from "./PickupEditAddressModal";
import PickupAddAddressModal from "./PickupAddAddressModal";
import {
  faPlus,
  faLocationDot,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  getConsumerAddressBookList,
  getDeliveryBoyAddressBookList,
  getEnterpriseAddressBookList,
  getEnterpriseBranch,
  updateAddressBookforConsumer,
} from "../../../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import DeleteModal from "./DeleteModal";
import { useSelector } from "react-redux";
import { showErrorToast } from "../../../utils/Toastify";
import { buildAddress } from "../../../utils/Constants";
import MapCard from "../../../assets/images/DummuMap-Card.png";
import AddEditLocation from "./AddEditLocation";
function ManageCompanyLocation() {
  const user = useSelector((state) => state.auth.user);
  const commonData = useSelector((state) => state.commonData?.commonData);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enterpriseBranch, setEnterpriseBranches] = useState(null);
  const [addressData, setAddressData] = useState();
  const [rowId, setRowId] = useState();

  const openEditModal = (addressItem) => {
    setShowEditModal(true);
    setAddressData(addressItem);
  };

  const getBranchLocation = () => {
    getEnterpriseBranch(
      user.userDetails.ext_id,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              showErrorToast(successResponse[0]._response.name);
            } else {
              var branches = [];
              for (
                let index = 0;
                index < successResponse[0]._response.length;
                index++
              ) {
                const element = successResponse[0]._response[index];
                element.isSelected = false;
                branches.push(element);
              }
              setEnterpriseBranches(branches);
            }
          }
        }
      },
      (errorResponse) => {
        showErrorToast(errorResponse[0]._errors.message);
      }
    );

    console.log('etest',enterpriseBranch)
  };


  const getLocationAddress = branchId => {
    let result = enterpriseBranch?.filter(branch => branch.id == branchId);
    return buildAddress(result[0]?.address,result[0]?.city,result[0]?.state,result[0]?.country,result[0]?.postal_code);
  };
  useEffect(() => {
    getBranchLocation();
  }, [user]);

  const openAddModal = () => {
    setShowAddModal(true);
  };
  const openDeleteModal = (rowId) => {
    setRowId;
    setShowDeleteModal(true);
  };

  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          <div className={Styles.addressBookAddressCard}>
            <p className={Styles.addressBookHeaderTitleText}>
              Manage company locations
            </p>
            <button
              onClick={openAddModal}
              className={Styles.addressBookPlusIconBtn}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div>
            {enterpriseBranch &&
              enterpriseBranch.map((branch, index) => (
                <div key={index} className={Styles.addressBookAddressesCards}>
                  {/* <img
                  className={Styles.enterpriseManagecompanyLocationsMapcard}
                  src={MapCard}
                  alt="Map"
                /> */}
                <div className={Styles.addressBookLocationDotIconCard}>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div>
                    <h5 className={Styles.addressBookUserCompanyname}>
                      {branch?.branch_name}
                    </h5>
                    <p className={Styles.addressBookUserCompanyAddress}>
                      {getLocationAddress(branch?.id)}
                    </p>
                  </div>
                  <button
                    onClick={() => openEditModal(branch)} // Pass a function reference
                    className={Styles.addressBookEditPenIconCard}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  {/* <button
                      onClick={() => openDeleteModal(branch?.id)} // Pass a function reference
                      style={{border:"none",backgroundColor:"transparent", color:"red"}}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button> */}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Modals */}
      <AddEditLocation
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        role={user?.userDetails?.role}
        extId={user?.userDetails?.ext_id}
        rowId={rowId}
      />
      <ToastContainer />
    </section>
  );
}

export default ManageCompanyLocation;
