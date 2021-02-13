import styled from "styled-components/native";
import React from "react";
import { Text } from "react-native";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

export default function VolunteerMap({ setPage }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpH_QuxnpFgRAWONd22YJODpC-XuRuQGY",
  });
  return (
    <>
      {!isLoaded ? (
        <div>Loading...</div>
      ) : loadError ? (
        <div>Error</div>
      ) : (
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          zoom={12}
          center={{ lat: 50.9397, lng: -1.3974 }}
          options={{ disableDefaultUI: true, zoomControl: true }}
        ></GoogleMap>
      )}
    </>
  );
}
