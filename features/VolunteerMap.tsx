import styled from "styled-components/native";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Button } from "@material-ui/core";

export default function VolunteerMap({ setPage }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpH_QuxnpFgRAWONd22YJODpC-XuRuQGY",
  });
  return (
    <View style={{ display: "flex" }}>
      <View style={styles.topBar}>
        <Button>bruh</Button>
        <View style={styles.textHolder}>
          <Text style={styles.nearText}>Requests near</Text>
          <Text style={styles.cityText}>Southampton, UK</Text>
        </View>
        <Button>bruh</Button>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    top: "2em",
    backgroundColor: "white",
    borderRadius: 50,
    zIndex: 10,
  },
  textHolder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "1rem",
    marginTop: "0.3rem",
    marginBottom: "0.5rem",
  },
  nearText: {
    color: "#707070",
    fontSize: 16,
  },
  cityText: {
    fontWeight: "500",
    color: "black",
    fontSize: 16,
  },
});
