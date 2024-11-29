import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationDot,
  faLocationCrosshairs,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Truck from "../../../assets/images/Truck.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarImg from "../../../assets/images/Pickup-Order-preview-Banner.png";
import { UseFetch } from "../../../utils/UseFetch";
import CommonHeader from "../../../common/CommonHeader";

const EnterpriseOrderPreview = () => {
  const checkboxTypes = ["checkbox"];

  return (
    <>
      <CommonHeader/>
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
                  <h2 className={Styles.addPickupDetailsText}>Order preview</h2>
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
                      3891 Ranchview , California 62639
                    </p>
                  </div>

                  <div className={Styles.PickupOrderPreviewBorderShowOff} />

                  <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderPreviewLocationIcon}
                      icon={faLocationCrosshairs}
                    />
                    <p className={Styles.pickuporderPreviewPickupAddressText}>
                      1901 Thornridge Cir. Shiloh, California
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
                        Semi Truck
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                        20000 liters max capacity
                      </p>
                    </div>
                    <div>
                      <img
                        className={Styles.PickupOrderPreviewTruckImage}
                        src={Truck}
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
                        Adam Smith
                      </h5>
                      <p className={Styles.pickupOrderPreviewCompanyName}>
                        Adam Inc.
                      </p>
                    </div>
                    <div>
                      <img
                        className={Styles.PickupOrderPreviewTruckImage}
                        src={Truck}
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
                        adaminc@email.com
                      </p>
                    </div>

                    <div className={Styles.pickupOrderPreviewAdminDetailsCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupOrderglobeIcon}
                        icon={faPhone}
                      />
                      <p className={Styles.pickupOrderAdminEmail}>
                        +33 1 23 45 67 89
                      </p>
                    </div>
                  </div>

                  <p className={Styles.pickupOrderPreviewPickupNotes}>
                    Lorem ipsum dolor sit amet consectetur. Ornare faucibus ac
                    ultricies sed penatibus. Integer sit sagit tis tempor cursus
                    amet. Nunc cursus cras fermen tum elit pulvinar amet.
                  </p>
                </div>

                <div className={Styles.pickupOrderPreviewVehicleCard}>
                  <p className={Styles.pickupOrderPreviewVehicleDetailsText}>
                    Estimated cost
                  </p>
                  <div className={Styles.pickupOrderPreviewVehicleDetailsCard}>
                    <div>
                      <h5 className={Styles.pickupOrderPreviewVehicleType}>
                        €34
                      </h5>
                      <div className={Styles.pickupOrderPreviewCompanyName}>
                        <div className={Styles.pickupOrderNormalDetailsCard}>
                          <p className={Styles.pickupOrderPreviewNormalDetails}>
                            26km
                          </p>
                          <p
                            className={`${Styles.pickupOrderPreviewNormalDetails} ${Styles.pickupPreviewB}`}
                          >
                            Semi Truck
                          </p>
                          <p className={Styles.pickupOrderPreviewNormalDetails}>
                            23 Min
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className={Styles.PickupOrderEuroTextBig}>€34</h1>
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
}

export default EnterpriseOrderPreview;
