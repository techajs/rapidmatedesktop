import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import Info from "../../../assets/images/info.png";
import getImage from "../../consumer/common/GetImage";
import { showErrorToast } from "../../../utils/Toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-regular-svg-icons";

const ServiceTypeSelection = ({
  vehicleTypeList,
  selectedVehicle,
  setSelectedVehicle,
  getPriceUsingVehicleType,
  setSelectedVehicleDetails,
  selectedVehiclePrice,
  setSelectedVehiclePrice,
  openModal,
  dropoffLocation,
}) => {
  const [selectedServiceType, setSelectedServiceType] = useState("");

  const handleServiceTypeClick = (serviceType, vehicleMatch) => {
    setSelectedServiceType(serviceType);
    if (vehicleMatch) {
      const vehicle = vehicleTypeList.find(
        (v) => v.vehicle_type === vehicleMatch
      );
      if (vehicle) {
        if (dropoffLocation !== "") {
          setSelectedVehicle(vehicle.vehicle_type);
          setSelectedVehicleDetails(vehicle);
          const price = getPriceUsingVehicleType(vehicle.id);
          setSelectedVehiclePrice(price);
        } else {
          showErrorToast("Please select a pickup and dropoff location.");
        }
      }
    }
  };

  return (
    <>
      <p className={Styles.enterpriseNewScheduleSelectType}>
        Select service type
      </p>

      {/* Delivery Boy with Scooter */}
      <div
        className={Styles.enterpriseselectServicesOptionCard}
        onClick={() => handleServiceTypeClick("Delivery boy with scooter", "Scooter")} // Replace "Scooter" with the exact vehicle_type in your list
      >
        <FontAwesomeIcon
          className={Styles.enterpriseSelectServiceTypeCricle}
          icon={
            selectedServiceType === "Delivery boy with scooter"
              ? faCircleDot
              : faCircle
          }
          style={{
            color:
              selectedServiceType === "Delivery boy with scooter"
                ? "red"
                : "black",
          }}
        />
        <p className={Styles.enterpriseSelectServiceTypeText}>
          Delivery boy with scooter
        </p>
      </div>

      {/* Delivery Boy without Scooter */}
      <div
        className={Styles.enterpriseselectServicesOptionCard}
        onClick={() =>
          handleServiceTypeClick("Delivery boy without scooter")
        }
      >
        <FontAwesomeIcon
          className={Styles.enterpriseSelectServiceTypeCricle}
          icon={
            selectedServiceType === "Delivery boy without scooter"
              ? faCircleDot
              : faCircle
          }
          style={{
            color:
              selectedServiceType === "Delivery boy without scooter"
                ? "red"
                : "black",
          }}
        />
        <p className={Styles.enterpriseSelectServiceTypeText}>
          Delivery boy without scooter
        </p>
      </div>

      {/* Multi-task Employee */}
      <div
        className={Styles.enterpriseselectServicesOptionCard}
        onClick={() => handleServiceTypeClick("Multi-task employee")}
      >
        <FontAwesomeIcon
          className={Styles.enterpriseSelectServiceTypeCricle}
          icon={
            selectedServiceType === "Multi-task employee"
              ? faCircleDot
              : faCircle
          }
          style={{
            color:
              selectedServiceType === "Multi-task employee" ? "red" : "black",
          }}
        />
        <p className={Styles.enterpriseSelectServiceTypeText}>
          Multi-task employee
        </p>
      </div>

      {/* Cleaning Staff */}
      <div
        className={Styles.enterpriseselectServicesOptionCard}
        onClick={() => handleServiceTypeClick("Cleaning staff")}
      >
        <FontAwesomeIcon
          className={Styles.enterpriseSelectServiceTypeCricle}
          icon={
            selectedServiceType === "Cleaning staff" ? faCircleDot : faCircle
          }
          style={{
            color: selectedServiceType === "Cleaning staff" ? "red" : "black",
          }}
        />
        <p className={Styles.enterpriseSelectServiceTypeText}>
          Cleaning staff
        </p>
      </div>

      {/* Vehicle Selection Section */}
      <div className={Styles.homePickupVehicleCardMain}>
        <div className={Styles.selectedVehiclePriceCard}>
          <p className={Styles.pickupRequestText}>Choose the vehicle</p>
          {selectedVehiclePrice && (
            <p className={Styles.selectedVehiclePriceText}>
              {selectedVehiclePrice} €
            </p>
          )}
        </div>
        <div className="row">
          {vehicleTypeList.map((vehicle, index) => (
            <div key={index} className="col-md-4">
              <div
                className={`${Styles.homePickupVehiclesCard} ${
                  selectedVehicle === vehicle.vehicle_type
                    ? Styles.selected
                    : ""
                }`}
                onClick={() => {
                  if (selectedServiceType === "Delivery boy with scooter") {
                    showErrorToast(
                      "Cannot select another vehicle with this service type."
                    );
                    return;
                  }
                  if (dropoffLocation !== "") {
                    setSelectedVehicle(vehicle.vehicle_type);
                    setSelectedVehicleDetails(vehicle);
                    const price = getPriceUsingVehicleType(vehicle.id);
                    setSelectedVehiclePrice(price);
                  } else {
                    showErrorToast("Please select a pickup and dropoff location.");
                  }
                }}
              >
                <button
                  className={Styles.pickupHomeInfoBtnIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(vehicle);
                  }}
                >
                  <img
                    className={Styles.homePickupInfo}
                    src={Info}
                    alt="info-Icon"
                  />
                </button>
                <img
                  className={`${Styles.homePickupBicycle} ${vehicle.className}`}
                  src={getImage(vehicle)}
                  alt={vehicle.vehicle_type}
                />
              </div>
              <div className={Styles.pickupHomeVehicleTypeCap}>
                <h4 className={Styles.pickupHomeVehicleTypeByName}>
                  {vehicle.vehicle_type}
                </h4>
                <p className={Styles.pickupHomeVehicleCap}>
                  {vehicle.vehicle_type_desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceTypeSelection;