// LocationInput.js
import React, { useEffect, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRight, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import Styles from '../../../assets/css/home.module.css';

const MultipleLocationInput = ({ setPickupLocation,setDropoffLocation, calculateRoute }) => {
  const originRef = useRef();
  const destinationRef = useRef();
  
  return (
    <div className={Styles.homePickupDropAddressCards}>
      <div className={Styles.pickupAddresAutocompleteCard}>
        <FontAwesomeIcon className={Styles.pickupHomeLocationIcon} icon={faLocationDot} />
        <div style={{ width: '100%' }}>
          <Autocomplete>
            <input
              className={Styles.homeMapPlaceSearch}
              type="text"
              placeholder="Enter pickup location"
              ref={originRef}
              onBlur={() => setPickupLocation(originRef.current.value)}
            />
          </Autocomplete>
        </div>
        <FontAwesomeIcon className="pickupHome-rightArrow-icon" icon={faArrowRight} />
      </div>

      <div className={Styles.homePickupLocationsBorderShowoff} />

      <div className={Styles.pickupAddresAutocompleteCard}>
        <FontAwesomeIcon className="dropHome-location-icon" icon={faLocationCrosshairs} />
        <div style={{ width: '100%' }}>
          <Autocomplete>
            <input
              className={Styles.homeMapPlaceSearch}
              type="text"
              placeholder="Enter drop-off location"
              ref={destinationRef}
              onBlur={() => {
                setDropoffLocation(destinationRef.current.value);
                calculateRoute();
              }}
            />
          </Autocomplete>
        </div>
        <FontAwesomeIcon className="pickupHome-rightArrow-icon" icon={faArrowRight} />
      </div>
    </div>
  );
};

export default MultipleLocationInput;
