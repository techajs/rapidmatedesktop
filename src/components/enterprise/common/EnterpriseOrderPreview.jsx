import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faLocationCrosshairs,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Truck from "../../../assets/images/Truck.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarImg from "../../../assets/images/Pickup-Order-preview-Banner.png";
import CommonHeader from "../../../common/CommonHeader";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import getImage from "../../consumer/common/GetImage";
import { buildAddress, getLocation } from "../../../utils/Constants";
import { useSelector } from "react-redux";

const EnterpriseOrderPreview = () => {
  const checkboxTypes = ["checkbox"];
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state)=>state.auth.user)
  const { order, orderCustomerDetails, dropoffDetail } = location.state || {};
  const [imageView, setImageView] = useState(
    URL.createObjectURL(orderCustomerDetails?.file[0]) || null
  );
  console.log("test", order);
  const dropoff=getLocation(order?.dropoffLocation,order?.dropoffLocation.lat,order?.dropoffLocation.lng)
  console.log('s',dropoff)
  return (
    <>
      <CommonHeader userData={user}/>
      <section className={Styles.addPickupDetailsSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <div className={Styles.addpickupDetailSidecardMain}>
                <img
                  className={Styles.addpickupDetailSidecardboxIcon}
                  src={SidebarImg}
                  alt="icon"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className={Styles.pickupOrderPreviewMainCard}>
                <div>
                  <h2 className={Styles.addPickupDetailsText}>
                    Order preview
                  </h2>
                  <p className={Styles.addPickupDetailsSubtext}>
                    Let’s review your order details. if it looks ok please
                    proceed to payment
                  </p>
                </div>

                <div className={Styles.pickupOrderPreviewAddresCard}>
                  <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderPreviewLocationIcon}
                      icon={faLocationDot}
                    />
                    <p className={Styles.pickuporderPreviewPickupAddressText}>
                      {order?.pickupLocation?.address}
                    </p>
                  </div>

                  <div className={Styles.PickupOrderPreviewBorderShowOff} />

                  <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderPreviewLocationIcon}
                      icon={faLocationCrosshairs}
                    />
                    <p className={Styles.pickuporderPreviewPickupAddressText}>
                    {buildAddress(dropoff?.address,dropoff?.city,dropoff?.state,dropoff?.country,dropoff?.postal_code)}
                    </p>
                  </div>
                </div>

                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Vehicle details
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        {order?.selectedVehicleDetails?.vehicle_type}
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                        {order?.selectedVehicleDetails?.vehicle_type_desc}
                      </p>
                    </div>
                    <div>
                      <img
                        className={Styles.PickupOrderPreviewTruckImage}
                        src={getImage(order?.selectedVehicleDetails)}
                        alt="icon"
                      />
                    </div>
                  </div>
                </div>

                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Pickup details
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        {orderCustomerDetails?.name +
                          " " +
                          orderCustomerDetails?.lastname}
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                        {orderCustomerDetails?.company}
                      </p>
                    </div>
                    <div>
                      <img
                        className={Styles.PickupOrderPreviewTruckImage}
                        src={imageView}
                        alt="icon"
                      />
                    </div>
                  </div>
                  <div
                    className={Styles.pickupOrderPreviewAdminDetailsMainCard}
                  >
                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faGlobe}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                        {orderCustomerDetails?.email}
                      </p>
                    </div>

                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faPhone}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                        {"+" + orderCustomerDetails?.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                    <FontAwesomeIcon
                      className={`${Styles.pickupOrderglobeIcon} me-2`}
                      icon={faCommentDots}
                    />
                    <p className={Styles.pickupOrderPreviewPickupNotes}>
                      {" "}
                      {orderCustomerDetails?.pickupnote}
                    </p>
                  </div>
                </div>
                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Dropoff details
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                    
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        {orderCustomerDetails?.dname +
                          " " +
                          orderCustomerDetails?.dlastname}
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                        {orderCustomerDetails?.dcompany}
                      </p>
                    </div>
                  </div>

                  <div
                    className={Styles.pickupOrderPreviewAdminDetailsMainCard}
                  >
                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faGlobe}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                        {dropoffDetail?.email}
                      </p>
                    </div>

                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faPhone}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                        {dropoffDetail?.phone}
                      </p>
                    </div>
                  </div>

                  <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                    <FontAwesomeIcon
                      className={`${Styles.pickupOrderglobeIcon} me-2`}
                      icon={faCommentDots}
                    />
                    <p className={Styles.pickupOrderPreviewPickupNotes}>
                      {" "}
                      {dropoffDetail?.dropoff_note}
                    </p>
                  </div>
                </div>
                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Estimated cost
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        € {order?.selectedVehiclePrice}
                      </h5>
                      <div className={Styles.pickupOrderPreviewCompanyName}>
                        <div className={Styles.pickupOrderNormalDetailsCard}>
                          <p className={Styles.pickupOrderPreviewNormalDetails}>
                            {order?.distance}
                          </p>
                          <p
                            className={`${Styles.pickupOrderPreviewNormalDetails} ${Styles.pickupPreviewB}`}
                          >
                            {order?.selectedVehicleDetails?.vehicle_type}
                          </p>
                          <p className={Styles.pickupOrderPreviewNormalDetails}>
                            {order?.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className={Styles.PickupOrderEuroTextBig}>
                        € {order?.selectedVehiclePrice}
                      </h1>
                    </div>
                  </div>
                </div>

                <div>
                  <Form>
                    {checkboxTypes.map((type) => (
                      <div
                        key={`default-${type}`}
                        className={`mb-3 ${Styles.checkboxCard}`}
                      >
                        <Form.Check
                          type={type}
                          id={`default-${type}`}
                          label={null}
                          className={Styles.saveAddresslaterCheckBox}
                        />
                        <p className={Styles.checkText}>
                          Save these addresses for later
                        </p>
                      </div>
                    ))}
                  </Form>
                </div>

                <div className={Styles.addPickupDetailsBtnCard}>
                  <Link
                    className={Styles.addPickupDetailsCancelBTn}
                    onClick={() => navigate(-1)}
                    style={{ color: "#000", cursor: "pointer" }}
                  >
                    Back
                  </Link>

                  <Link
                    to="/enterprises-schedule-approved"
                    className={Styles.addPickupDetailsNextBtn}
                  >
                    Proceed to payment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterpriseOrderPreview;
