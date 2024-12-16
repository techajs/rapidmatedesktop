import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { MAPS_API_KEY } from '../utils/Constants';

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const defaultCenter = {
  lat: 48.85754309772872,
  lng: 2.3513877855537912,
};

export default function MapDeliveryDetails({ addressData = null }) {
  const [origin, setOrigin] = useState(defaultCenter);
  const [destination, setDestination] = useState({
    lat: 48.86020382046169,
    lng: 2.3565536180821782,
  });
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    if (addressData) {
      setOrigin({
        lat: addressData.sourceAddress.latitude
          ? parseFloat(addressData.sourceAddress.latitude)
          : defaultCenter.lat,
        lng: addressData.sourceAddress.longitude
          ? parseFloat(addressData.sourceAddress.longitude)
          : defaultCenter.lng,
      });

      setDestination({
        lat: addressData.destinationAddress.latitude
          ? parseFloat(addressData.destinationAddress.latitude)
          : 48.86020382046169,
        lng: addressData.destinationAddress.longitude
          ? parseFloat(addressData.destinationAddress.longitude)
          : 2.3565536180821782,
      });
    }
  }, [addressData]);

  const handleLoadDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  useEffect(() => {
    if (origin && destination) handleLoadDirections();
  }, [origin, destination]);

  return (
    <LoadScript googleMapsApiKey={process.env.MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={origin} zoom={12}>
        {/* Origin Marker */}
        <Marker position={origin} label="Start" />

        {/* Destination Marker */}
        <Marker position={destination} label="End" />

        {/* Directions Renderer */}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}
