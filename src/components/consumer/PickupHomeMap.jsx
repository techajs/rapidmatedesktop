import React, { useRef, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons";
import { MAPS_API_KEY } from '../../commonComponents/GoogleMapAPI';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

const center = { lat: 28.56341236809311, lng: 77.33609181917045 };

function PickupHomeMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  if (!isLoaded) {
    return <p>Loading...</p>; // Replace with a loading indicator from React Bootstrap if needed
  }

  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    try {
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value = '';
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
        {/* Google Map */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div style={{ position: 'absolute', top: '20px', left: '20px', maxWidth: '400px', zIndex: '1' }}>
        {/* Form */}
        <Form>
          <InputGroup className="mb-3">
            {/* Origin Autocomplete */}
            <ReactGoogleAutocomplete
              placeholder="Origin"
              apiKey={MAPS_API_KEY}
              ref={originRef}
              onSelect={(place) => {
                if (place && place.geometry && place.geometry.location) {
                  originRef.current.value = place.formatted_address;
                }
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            {/* Destination Autocomplete */}
            <ReactGoogleAutocomplete
              placeholder="Destination"
              apiKey={MAPS_API_KEY}
              ref={destinationRef}
              onSelect={(place) => {
                if (place && place.geometry && place.geometry.location) {
                  destinationRef.current.value = place.formatted_address;
                }
              }}
            />
          </InputGroup>
          <ButtonGroup className="mb-3">
            <Button variant="outline-pink" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <Button variant="outline-danger" onClick={clearRoute}>
              <FontAwesomeIcon icon={faClock} />
            </Button>
          </ButtonGroup>
        </Form>
        {/* Distance and Duration */}
        <div className="d-flex justify-content-between">
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
          <Button variant="outline-secondary" onClick={() => {
            if (map) {
              map.panTo(center);
              map.setZoom(15);
            }
          }}>
            <FontAwesomeIcon icon={faLocationDot} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PickupHomeMap;
