// LocationInputs.js
import React, { useEffect, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRight, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import Styles from '../../../assets/css/home.module.css';

const LocationInputs = ({ setPickupLocation,setDropoffLocation,pickupLocation, calculateRoute,isPickupDisabled }) => {
  const originRef = useRef();
  const destinationRef = useRef();
  const originAutocomplete = useRef(null);
  const destinationAutocomplete = useRef(null);

  const handlePlaceChanged = (ref, setLocation) => {
    const autocomplete = ref.current.getPlace();
    if (autocomplete) {
      const locationDetails = {
        address: autocomplete.formatted_address,
        displayedAddress: ref.current.getPlace().name || autocomplete.formatted_address,
        lat: autocomplete.geometry.location.lat(),
        lng: autocomplete.geometry.location.lng(),
        components: autocomplete.address_components,
      };
      setLocation(locationDetails);
    }
  };

  
  return (
    <div className={Styles.homePickupDropAddressCards}>
      <div className={Styles.pickupAddresAutocompleteCard}>
        <FontAwesomeIcon className={Styles.pickupHomeLocationIcon} icon={faLocationDot} />
        <div style={{ width: '100%' }}>
          <Autocomplete
           onLoad={(autocomplete) => (originAutocomplete.current = autocomplete)}
           onPlaceChanged={() => handlePlaceChanged(originAutocomplete, setPickupLocation)}
          >
            <input
              className={Styles.homeMapPlaceSearch}
              type="text"
              placeholder="Enter pickup location"
              ref={originRef}
              value={pickupLocation?.address || ""} // Default value for pickup location
              onChange={(e) =>
                setPickupLocation((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              disabled={isPickupDisabled}
            />
          </Autocomplete>
        </div>
        <FontAwesomeIcon className="pickupHome-rightArrow-icon" icon={faArrowRight} />
      </div>

      <div className={Styles.homePickupLocationsBorderShowoff} />

      <div className={Styles.pickupAddresAutocompleteCard}>
        <FontAwesomeIcon className="dropHome-location-icon" icon={faLocationCrosshairs} />
        <div style={{ width: '100%' }}>
          <Autocomplete
           onLoad={(autocomplete) => (destinationAutocomplete.current = autocomplete)}
           onPlaceChanged={() => {
             handlePlaceChanged(destinationAutocomplete, setDropoffLocation);
             calculateRoute();
           }}
          >
            <input
              className={Styles.homeMapPlaceSearch}
              type="text"
              placeholder="Enter drop-off location"
              ref={destinationRef}
            />
          </Autocomplete>
        </div>
        <FontAwesomeIcon className="pickupHome-rightArrow-icon" icon={faArrowRight} />
      </div>
    </div>
  );
};

export default LocationInputs;
