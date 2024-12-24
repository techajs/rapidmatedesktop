import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { MAPS_API_KEY } from "../utils/Constants";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 48.85754309772872,
  lng: 2.3513877855537912,
};

export default function DeliveryDetailsMap({ addressData = null }) {
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

  const handleLoadDirections = useCallback(() => {
    if (window.google && window.google.maps) {
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
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [origin, destination]);

  useEffect(() => {
    if (origin && destination) handleLoadDirections();
  }, [origin, destination, handleLoadDirections]);

  return (
    <LoadScript
      googleMapsApiKey={MAPS_API_KEY}
      onLoad={() => console.log("Google Maps script loaded")}
      onError={(error) =>
        console.error("Error loading Google Maps script:", error)
      }
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        center={origin}
        zoom={1}
      >
        <Marker position={origin} label="Start" />
        <Marker position={destination} label="End" />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}
