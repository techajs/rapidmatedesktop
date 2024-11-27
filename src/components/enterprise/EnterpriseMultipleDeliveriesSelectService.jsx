import React, { useState } from "react";
import Styles from "../../assets/css/home.module.css";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import CommonHeader from "../../common/CommonHeader";
import Track from "../../assets/images/Track-Order-Vehicle.png";
import Package from "../../assets/images/One-TimePackage-big.png";
import Cycle from "../../assets/images/Cycle-Right.png";
import Scooter from "../../assets/images/Scooter-Right.png";
import Car from "../../assets/images/Car-Right.png";
import Van from "../../assets/images/Van-Right.png";
import Pickup from "../../assets/images/Pickup-Right.png";
import Truck from "../../assets/images/Truck-Right.png";
import Other from "../../assets/images/Package.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowRight,
  faLocationCrosshairs,
  faRepeat,
  faPaperclip,
  faCirclePlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircle,
  faClock,
  faCircleDot,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { MAPS_API_KEY } from "../../utils/Constants";
import EnterpriseSelectServiceDatePicker from "./common/EnterpriseSelectServiceDatePicker";

const EnterpriseMultipleDeliveriesSelectService = () => {
  const [repeatOrder, setRepeatOrder] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Daily");
  const [imagePreview, setImagePreview] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleServiceTypeClick = (serviceType, vehicleName) => {
    setSelectedServiceType(serviceType);
    setSelectedVehicle(vehicleName);
  };

  // Handle switch change
  const handleRepeatOrder = (event) => {
    setRepeatOrder(event.target.checked);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result); // Generate preview
      reader.readAsDataURL(file);
    }
  };

  const [divs, setDivs] = useState([
    {
      id: Date.now(), // Unique identifier for each div
      isMain: true, // Flag to indicate the main row
    },
  ]);

  // Add a new row
  const addNewDiv = () => {
    setDivs([...divs, { id: Date.now(), isMain: false }]);
  };

  // Remove a specific row by id
  const removeDiv = (id) => {
    setDivs(divs.filter((div) => div.id !== id));
  };

  const vehicles = [
    {
      image: Cycle,
      name: "Cycle",
      className: "enterpriseSelect-ServiceCycle",
    },
    {
      image: Scooter,
      name: "Scooter",
      className: "enterpriseSelect-ServiceScooter",
    },
    {
      image: Car,
      name: "Car",
      className: "enterpriseSelect-ServiceCar",
    },
    {
      image: Van,
      name: "Van",
      className: "enterpriseSelect-ServiceVan",
    },
    {
      image: Pickup,
      name: "Pickup",
      className: "enterpriseSelect-ServicePickup",
    },
    {
      image: Truck,
      name: "Truck",
      className: "enterpriseSelect-ServiceTruck",
    },
    {
      image: Other,
      name: "Other",
      className: "enterpriseSelect-ServiceOther",
    },
  ];

  return (
    <>
      {/* Header Start Here  */}
      <CommonHeader />
      {/* Header End Here  */}
      <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <div className={Styles.enterpriseNewScheduleTitleCard}>
                <div>
                  <h4 className={Styles.enterpriseNewScheduleText}>
                    Multiple deliveries
                  </h4>
                  <img
                    className={Styles.enterpriseOneTimeTrackImg}
                    src={Track}
                    alt="img"
                  />
                </div>
                <div>
                  <img
                    className={Styles.enterpriseOneTimePackageImg}
                    src={Package}
                    alt="Img"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className={Styles.enterpriseNewScheduletypeMainCard}>
                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  Select service type
                </h4>

                <div className={Styles.enterpriseselectServicesOptionCardMain}>
                  <div
                    className={`${Styles.enterpriseselectServicesOptionCard} ${
                      selectedServiceType === "scooter" ? "selected" : ""
                    }`}
                    onClick={() => handleServiceTypeClick("scooter", "Scooter")}
                  >
                    <FontAwesomeIcon
                      className={Styles.enterpriseSelectServiceTypeCricle}
                      icon={
                        selectedServiceType === "scooter"
                          ? faCircleDot
                          : faCircle
                      }
                    />
                    <p className={Styles.enterpriseSelectServiceTypeText}>
                      Delivery boy with scooter
                    </p>
                  </div>

                  <div
                    className={`${Styles.enterpriseselectServicesOptionCard} ${
                      selectedServiceType === "no-scooter" ? "selected" : ""
                    }`}
                    onClick={() => handleServiceTypeClick("no-scooter", "")}
                  >
                    <FontAwesomeIcon
                      className={Styles.enterpriseSelectServiceTypeCricle}
                      icon={
                        selectedServiceType === "no-scooter"
                          ? faCircleDot
                          : faCircle
                      }
                    />
                    <p className={Styles.enterpriseSelectServiceTypeText}>
                      Delivery boy without scooter
                    </p>
                  </div>

                  <div
                    className={`${Styles.enterpriseselectServicesOptionCard}  ${
                      selectedServiceType === "multi-task" ? "selected" : ""
                    }`}
                    onClick={() => handleServiceTypeClick("multi-task", "")}
                  >
                    <FontAwesomeIcon
                      className={Styles.enterpriseSelectServiceTypeCricle}
                      icon={
                        selectedServiceType === "multi-task"
                          ? faCircleDot
                          : faCircle
                      }
                    />
                    <p className={Styles.enterpriseSelectServiceTypeText}>
                      Multi-task employee
                    </p>
                  </div>

                  <div
                    className={`${Styles.enterpriseselectServicesOptionCard} ${
                      selectedServiceType === "cleaning" ? "selected" : ""
                    }`}
                    onClick={() => handleServiceTypeClick("cleaning", "")}
                  >
                    <FontAwesomeIcon
                      className={Styles.enterpriseSelectServiceTypeCricle}
                      icon={
                        selectedServiceType === "cleaning"
                          ? faCircleDot
                          : faCircle
                      }
                    />
                    <p className={Styles.enterpriseSelectServiceTypeText}>
                      Cleaning staff
                    </p>
                  </div>
                </div>

                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  Select vehicle type
                </h4>
                <div className={Styles.enterpriseSelectServiceVehicleCardMain}>
                  <div className="row">
                    {vehicles.map((vehicle, index) => (
                      <div className="col-md-4" key={index}>
                        <div
                          className={`${
                            Styles.enterpriseSelectServiceVehicleCard
                          } ${
                            selectedVehicle === vehicle.name ? "selected" : ""
                          }`}
                          onClick={() => setSelectedVehicle(vehicle.name)}
                        >
                          <FontAwesomeIcon
                            className={Styles.enterpriseSelectVehicleCircleIcon}
                            icon={
                              selectedVehicle === vehicle.name
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={
                              Styles.enterpriseSelectServiceVehicleName
                            }
                          >
                            {vehicle.name}
                          </p>
                          <img
                            className={Styles.enterpriseVehilces}
                            src={vehicle.image}
                            alt={vehicle.name}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  Set pickup & drop-off locations
                </h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className={Styles.enterpriseSelectServiceLoc}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FontAwesomeIcon
                          className={Styles.pickupHomelocationicon}
                          icon={faLocationDot}
                        />
                        <ReactGoogleAutocomplete
                          className={Styles.homeMapPlaceSearch}
                          apiKey={MAPS_API_KEY}
                          placeholder="Enter pickup address"
                          onPlaceSelected={(place) => {
                            console.log(place);
                          }}
                        />
                        <FontAwesomeIcon
                          className={Styles.pickupHomerightArrowicon}
                          icon={faArrowRight}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.enterpriseSelectServiceLoc}>
                      {divs.map((div) => (
                        <div
                          key={div.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupHomelocationicon}
                            icon={faLocationCrosshairs}
                          />
                          <ReactGoogleAutocomplete
                            className={Styles.homeMapPlaceSearch}
                            apiKey={MAPS_API_KEY}
                            placeholder="Enter drop-off address"
                            onPlaceSelected={(place) => {
                              console.log(place);
                            }}
                          />
                          {div.isMain ? (
                            <FontAwesomeIcon
                              className={Styles.pickupHomerightArrowicon}
                              icon={faCirclePlus}
                              onClick={addNewDiv} // Add new row on click
                              style={{ cursor: "pointer", marginLeft: "10px" }} // Add spacing for the plus icon
                            />
                          ) : (
                            <FontAwesomeIcon
                              className={Styles.pickupHometrashIcon}
                              icon={faTrash}
                              onClick={() => removeDiv(div.id)} // Remove the specific row
                              style={{ cursor: "pointer", marginLeft: "10px" }} // Add spacing for the trash icon
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="mb-2" controlId="formPlaintext1">
                      <Form.Label
                        className={Styles.deliveryboyLabelVehicleInfo}
                      >
                        Company
                      </Form.Label>
                      <Form.Control
                        className={Styles.deliveryboyVehicleInfo}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="mb-2" controlId="formPlaintext">
                      <Form.Label
                        className={Styles.deliveryboyLabelVehicleInfo}
                      >
                        Phone Number
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
                          className={Styles.signupUserName}
                          type="text"
                          placeholder="0 00 00 00 00"
                        />
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-12 mb-2">
                    <label
                      htmlFor="file"
                      className={Styles.addPickupDetailFormLabels}
                    >
                      Package photo
                    </label>

                    <div className={Styles.addPickupUploadPhoto}>
                      {imagePreview ? (
                        <div style={{ marginBottom: "20px" }}>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                              width: "auto",
                              height: "150px",
                              objectFit: "contain",
                              borderRadius: "10px",
                              padding: "5px",
                            }}
                          />
                          <button
                            onClick={() => setImagePreview(null)} // Clear preview
                            style={{
                              marginTop: "10px",
                              padding: "5px 10px",
                              backgroundColor: "#ff4444",
                              color: "#fff",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{
                            padding: "20px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            display: "inline-block",
                          }}
                        >
                          <input
                            type="file"
                            accept="image/*" // Only allow image files
                            style={{
                              display: "none",
                            }}
                            onChange={handleImageChange}
                            id="fileInput"
                          />
                          <label
                            htmlFor="fileInput"
                            style={{
                              color: "#000",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            <FontAwesomeIcon icon={faPaperclip} />
                            Drag or click to attach a photo
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="formPlaintext1">
                      <Form.Label
                        className={Styles.deliveryboyLabelVehicleInfo}
                      >
                        Package Id
                      </Form.Label>
                      <Form.Control
                        className={Styles.deliveryboyVehicleInfo}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="formPlaintext1">
                      <Form.Label
                        className={Styles.deliveryboyLabelVehicleInfo}
                      >
                        Pickup Notes
                      </Form.Label>
                      <Form.Control
                        className={Styles.deliveryboyVehicleInfo}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <h4 className={Styles.enterpriseNewScheduleSelectType}>
                    Set date & time
                  </h4>

                  <div className="col-md-6 mb-2">
                    <div>
                      <p className={Styles.enterpriseSelectServicePickupDate}>
                        Pickup date
                      </p>
                      <div className={Styles.enterpriseSelectServiceDateCard}>
                        <EnterpriseSelectServiceDatePicker mode="date" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-2">
                    <div>
                      <p className={Styles.enterpriseSelectServicePickupDate}>
                        Pickup time
                      </p>
                      <div className={Styles.enterpriseSelectServiceTimeCard}>
                        <EnterpriseSelectServiceDatePicker mode="time" />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={Styles.enterpriseSelectServiceRepeatOrderMainCard}
                >
                  <div
                    className={Styles.enterpriseSelectServiceRepeatOrderCard}
                  >
                    <p
                      className={Styles.enterpriseSelectServiceRepeatOrderText}
                    >
                      Repeat this order
                    </p>
                    <Form>
                      <Form.Check
                        type="switch"
                        id="repeat-switch"
                        checked={repeatOrder}
                        onChange={handleRepeatOrder}
                        className={repeatOrder ? "repeat-switch" : ""}
                      />
                    </Form>
                  </div>
                  {repeatOrder && (
                    <div>
                      <div
                        className={Styles.enterpriseSelectServiceDayilyCardMain}
                      >
                        <div
                          className={`${
                            Styles.enterpriseSelectServiceDayilyCard
                          } ${selectedOption === "Daily" ? "selected" : ""}`}
                          onClick={() => handleSelect("Daily")}
                        >
                          <FontAwesomeIcon
                            className={`${
                              Styles.enterpriseSelectServiceRepeatCircle
                            } ${
                              selectedOption === "Daily"
                                ? "Service-selected-icon"
                                : ""
                            }`}
                            icon={
                              selectedOption === "Daily"
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={Styles.enterpriseSelectServiceDayilyText}
                          >
                            Daily
                          </p>
                        </div>

                        <div
                          className={`${
                            Styles.enterpriseSelectServiceDayilyCard
                          } ${selectedOption === "Weekly" ? "selected" : ""}`}
                          onClick={() => handleSelect("Weekly")}
                        >
                          <FontAwesomeIcon
                            className={`${
                              Styles.enterpriseSelectServiceRepeatCircle
                            } ${
                              selectedOption === "Weekly"
                                ? "Service-selected-icon"
                                : ""
                            }`}
                            icon={
                              selectedOption === "Weekly"
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={Styles.enterpriseSelectServiceDayilyText}
                          >
                            Weekly
                          </p>
                        </div>

                        <div
                          className={`${
                            Styles.enterpriseSelectServiceDayilyCard
                          } ${selectedOption === "Monthly" ? "selected" : ""}`}
                          onClick={() => handleSelect("Monthly")}
                        >
                          <FontAwesomeIcon
                            className={`${
                              Styles.enterpriseSelectServiceRepeatCircle
                            } ${
                              selectedOption === "Monthly"
                                ? "Service-selected-icon"
                                : ""
                            }`}
                            icon={
                              selectedOption === "Monthly"
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={Styles.enterpriseSelectServiceDayilyText}
                          >
                            Monthly
                          </p>
                        </div>
                      </div>

                      <div
                        className={
                          Styles.enterpriseSelectServiceRepeatEveryCard
                        }
                      >
                        <div
                          className={Styles.enterpriseSelectServiceDayilyCard}
                        >
                          <FontAwesomeIcon
                            className={
                              Styles.enterpriseSelectServiceRepeatCircle
                            }
                            icon={faRepeat}
                          />
                          <p
                            className={
                              Styles.enterpriseSelectServiceRepeatEveryText
                            }
                          >
                            Repeat every
                          </p>
                        </div>
                        <div>
                          <Form.Select
                            className={
                              Styles.enterpriseSelectServiceRepeatDateSelect
                            }
                            aria-label="Default select example"
                          >
                            <option>1</option>
                            <option value="1">2</option>
                            <option value="2">3</option>
                            <option value="3">4</option>
                          </Form.Select>
                        </div>
                        <div>
                          <Form.Select
                            className={
                              Styles.enterpriseSelectServiceRepeatDaySelect
                            }
                            aria-label="Default select example"
                          >
                            <option>Day</option>
                            <option value="1">2</option>
                            <option value="2">3</option>
                            <option value="3">4</option>
                          </Form.Select>
                        </div>
                        <div
                          className={Styles.enterpriseSelectServiceUntilCard}
                        >
                          <p
                            className={Styles.enterpriseSelectServiceUntilText}
                          >
                            until
                          </p>
                          <div>
                            <Form.Select
                              className={
                                Styles.enterpriseSelectServiceRepeatDateuntil
                              }
                              aria-label="Default select example"
                            >
                              <option>8/23/2024</option>
                              <option value="1">2</option>
                              <option value="2">3</option>
                              <option value="3">4</option>
                            </Form.Select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className={Styles.enterpriseSelectServiceOccursday}>
                          Occurs every day until{" "}
                          <span
                            className={Styles.enterpriseSelectServiceOccursSpan}
                          >
                            August 23, 2024
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className={Styles.enterpriseSelectServiceNextBtnCard}>
                  <Link
                    to="/enterprise-order-preview"
                    className={Styles.enterpriseSelectServiceNextBtn}
                  >
                    Next
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

export default EnterpriseMultipleDeliveriesSelectService;
