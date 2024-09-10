import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Styles from "../../assets/css/home.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import Bicycle from "../../assets/images/Cycle-Vehicle.png";
import Scooter from "../../assets/images/Scooter-Vehicle.png";
import Car from "../../assets/images/Car-Vehicle.png";
import Partner from "../../assets/images/Partner-Vehicle.png";
import Van from "../../assets/images/Van-Vehicle.png";
import Pickup from "../../assets/images/Pickup-Vehicle.png";
import Truck from "../../assets/images/Truck-Vehicle.png";
import Package from "../../assets/images/Package.png";
import { Form } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { getAllVehicleTypes } from '../../data_manager/dataManage';
function AddVehicle() {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const { isAuthenticated, role } = useSelector((state) =>state.auth );
    const baseUrl=role?.toLowerCase().replace(/_/g, '');
    const [vehicleTypeList, setVehicleTypeList] = useState([]);
    const [loading,setLoading]=useState(false)
   
    const handleVehicleClick = (vehicleName) => {
      setSelectedVehicle(vehicleName);
    };
   useEffect(()=>{
    setLoading(true);
    const getAllVehiclesType = () => {
      getAllVehicleTypes(
        null,
        (successResponse) => {
          if (successResponse[0]._success) {
            setLoading(false);
            console.log(successResponse[0]._response)
            setVehicleTypeList(successResponse[0]._response);
          }
        },
        (errorResponse) => {
          setLoading(false);
          let err = "";
          if (errorResponse.errors) {
            err = errorResponse.errors.msg[0].msg;
          } else {
            err = errorResponse[0]._errors.message;
          }
          setErrorMessage(err);
        }
      );
    };
    getAllVehiclesType();
   },[])
   const getImage = (vehicleData) => {
    switch (vehicleData.vehicle_type_id) {
      case 1:
        return Bicycle;
      case 2:
        return Scooter;
      case 3:
        return Car;
      case 4:
        return Partner;
      case 5:
        return Van;
      case 6:
        return Pickup;
      case 7:
        return Truck;
      default:
        return Package;
    }
  };
    return (
      <>
        <section className={Styles.profileChooseSec}>
          <div className="container">
            <div>
              <Link className={Styles.logoCard} to={!isAuthenticated && !role ? '/' : `/${baseUrl}/add-vehicle`}>
                <img className={Styles.logo} src={Logo} alt="logo" />
                <h2 className={Styles.companyName}>Rapidmate</h2>
              </Link>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className={Styles.pickupSignupFormMainCard}>
                  <div className={Styles.chooseMainCard}>
                    <div className={Styles.chooseProfileCard}>
                      <h2 className={Styles.chooseProfileHeading}>Add vehicle</h2>
                      <p className={Styles.chooseProfileSubheading}>
                        Please add vehicle you will use for delivery
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className={Styles.deliveryboyVehicleSelectText}>
                      Select vehicle type
                    </p>
                    <div className={Styles.deliveryboyAddVehicleAllImagesCard}>
                      {vehicleTypeList.map((vehicle, index) => (
                        <div
                          key={index}
                          className={`${Styles.deliveryboyAddVehicleVehicleCard} ${
                            selectedVehicle === vehicle.vehicle_type ?  Styles.selected : ""
                          }`}
                          onClick={() => handleVehicleClick(vehicle.vehicle_type)}
                        >
                          <div className={Styles.deliveryboyaddVehicleVehicleImageCard}>
                            <img
                              className={Styles.DeliveryBicycle}
                              src={getImage(vehicle)}
                              alt={vehicle.vehicle_type}
                            />
                          </div>
                          <p className={Styles.deliveryboyVehicleName}>
                            {vehicle.vehicle_type}
                          </p>
                        </div>
                      ))}
                    </div>
  
                    <div>
                      <p className={Styles.deliveryboyVehicleFormDetailText}>
                        Fill vehicle details
                      </p>
                      <Form>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group
                              className="mb-2"
                              controlId="formPlaintext1"
                            >
                              <Form.Label className={Styles.deliveryboyLabelVehicleInfo}>
                                Vehicle No.
                              </Form.Label>
                              <Form.Control
                                className={Styles.deliveryboyVehicleInfo}
                                type="text"
                                placeholder="Type here.."
                              />
                            </Form.Group>
                          </div>
  
                          <div className="col-md-6">
                            <Form.Group
                              className="mb-2"
                              controlId="formPlaintext2"
                            >
                              <Form.Label className={Styles.deliveryboyLabelVehicleInfo}>
                                Vehicle model
                              </Form.Label>
                              <Form.Control
                                className={Styles.deliveryboyVehicleInfo}
                                type="text"
                                placeholder="Type here.."
                              />
                            </Form.Group>
                          </div>
  
                          <div className="col-md-6">
                            <Form.Group
                              className="mb-2"
                              controlId="formPlaintext3"
                            >
                              <Form.Label className={Styles.deliveryboyLabelVehicleInfo}>
                                Vehicle make
                              </Form.Label>
                              <Form.Control
                                className={Styles.deliveryboyVehicleInfo}
                                type="text"
                                placeholder="Type here.."
                              />
                            </Form.Group>
                          </div>
  
                          <div className="col-md-6">
                            <Form.Group
                              className="mb-2"
                              controlId="formPlaintext4"
                            >
                              <Form.Label className={Styles.deliveryboyLabelVehicleInfo}>
                                Vehicle variant
                              </Form.Label>
                              <Form.Control
                                className={Styles.deliveryboyVehicleInfo}
                                type="text"
                                placeholder="Type here.."
                              />
                            </Form.Group>
                          </div>
  
                          <p className={Styles.deliveryboyVehicleFormDetailText}>
                            Upload documents
                          </p>
                          <div className="col-md-6">
                            <div className="mb-2">
                              <Form.Label className={Styles.deliveryboyLabelVehicleInfo}>
                                Vehicle variant
                              </Form.Label>
                              <div className={Styles.deliveryaddVehicleVehicleUploadCard}>
                                <input
                                  type="file"
                                  accept=".png, .jpg, .pdf, .svg,"
                                />
                              </div>
                            </div>
                          </div>
  
                          <div className="col-md-6">
                            <div className="mb-2">
                              <Form.Label className={Styles.deliveryboyLabelVehicleInfo}>
                                Driving license
                              </Form.Label>
                              <div className={Styles.deliveryaddVehicleVehicleUploadCard}>
                                <input
                                  type="file"
                                  accept=".png, .jpg, .pdf, .svg,"
                                />
                              </div>
                            </div>
                          </div>
  
                          <div className="col-md-6">
                            <div className="mb-2">
                              <Form.Label className={Styles.deliveryboyLabelVehicleInfo}>
                                Vehicle insurance
                              </Form.Label>
                              <div className={Styles.deliveryaddVehicleVehicleUploadCard}>
                                <input
                                  type="file"
                                  accept=".png, .jpg, .pdf, .svg,"
                                />
                              </div>
                            </div>
                          </div>
  
                          <div className="col-md-6">
                            <div className="mb-2">
                              <Form.Label className={Styles.deliveryboyLabelVehicleInfo}>
                                Passport
                              </Form.Label>
                              <div className={Styles.deliveryaddVehicleVehicleUploadCard}>
                                <input
                                  type="file"
                                  accept=".png, .jpg, .pdf, .svg,"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
  
                    <div>
                      <Link
                        to="/deliveryboy/add-work-type"
                        className={Styles.pickupSignupContinueBtn}
                        type="button"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default AddVehicle
