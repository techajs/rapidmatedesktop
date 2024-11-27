import React, { useState } from "react";
import Styles from "../../assets/css/home.module.css";
import CommonHeader from "../../common/CommonHeader";
import Track from "../../assets/images/Track-Order-CreateShift-Vehicle.png";
import ShiftCalender from "../../assets/images/CreateShift-Calender.png";
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
  faCircle,
  faClock,
  faCircleDot,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

const EnterpriseShiftSelectService = () => {
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleServiceTypeClick = (serviceType, vehicleName) => {
    setSelectedServiceType(serviceType);
    setSelectedVehicle(vehicleName);
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
                    Create shift
                  </h4>
                  <img
                    className={Styles.enterpriseCreateShiftTrackImg}
                    src={Track}
                    alt="img"
                  />
                </div>
                <div>
                  <img
                    className={Styles.enterpriseCreateShiftImg}
                    src={ShiftCalender}
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
                <div className={Styles.enterpriseSelectServiceNextBtnCard}>
                  <Link
                    to="/enterprises-createshift-availability"
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

export default EnterpriseShiftSelectService;
