import React, { useState } from "react";
import Styles from "../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationDot,
  faLocationCrosshairs,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Truck from "../assets/images/Truck.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarImg from "../assets/images/Pickup-Order-preview-Banner.png";
import { UseFetch } from "../utils/UseFetch";
import CommonHeader from "../common/CommonHeader";
import getImage from "../components/consumer/common/GetImage";
import { uploadDocumentsApi } from "../data_manager/dataManage";

function OrderView() {
  const navigate=useNavigate()
  const location = useLocation();
  const { order, orderCustomerDetails } = location.state || {};
  const [loading,setLoading]=useState(false)
  const [packageImageId, setPackageImageId] = useState(null);
  const [imageView,setImageView]=useState(URL.createObjectURL(orderCustomerDetails?.file[0]) || null)
  const checkboxTypes = ["checkbox"];
  const { user } = UseFetch();
  console.log(URL.createObjectURL(orderCustomerDetails?.file[0]))
  const submitHandler = (e)=>{
    e.preventDefault()
    // let photo = {
    //   uri: URL.createObjectURL(orderCustomerDetails?.file[0]),
    //   type: orderCustomerDetails?.file[0]?.type,
    //   name: orderCustomerDetails?.file[0]?.name,
    // };
    // const formdata = new FormData();
    // formdata.append('file', photo);
    // setLoading(true);
    // uploadDocumentsApi(
    //   formdata,
    //   successResponse => {
    //     setLoading(false);
    //     setPackageImageId(JSON.parse(successResponse).id);
    //   },
    //   errorResponse => {
    //     setLoading(false);
    //   },
    // );
    navigate('/consumer/payment',{
      state: {
        order,
        orderCustomerDetails,
      },
    })
  }
   
  
  console.log(orderCustomerDetails?.file[0])

  return (
    <>
      <CommonHeader userData={user} />
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
                      {order?.pickupLocation}
                    </p>
                  </div>

                  <div className={Styles.PickupOrderPreviewBorderShowOff} />

                  <div className={Styles.pickupOrderPreviewPickupAddressCard}>
                    <FontAwesomeIcon
                      className={Styles.pickupOrderPreviewLocationIcon}
                      icon={faLocationCrosshairs}
                    />
                    <p className={Styles.pickuporderPreviewPickupAddressText}>
                      {order?.dropoffLocation}
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

                  <p className={Styles.pickupOrderPreviewPickupNotes}>
                    {orderCustomerDetails?.pickupnote}
                  </p>
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
                    to="/consumer/pickup-details"
                    style={{ color: "#000" }}
                  >
                    Back
                  </Link>
                  <Link
                    to="#"
                    onClick={submitHandler}
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

export default OrderView;
