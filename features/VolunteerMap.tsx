import styled from "styled-components/native";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { IconButton, SvgIcon } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CreateIcon from "@material-ui/icons/Create";

export default function VolunteerMap({ setPage }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpH_QuxnpFgRAWONd22YJODpC-XuRuQGY",
  });
  return (
    <View style={{ display: "flex" }}>
      <View style={styles.topBar}>
        <IconButton>
          <SvgIcon component={KeyboardArrowLeftIcon}></SvgIcon>
        </IconButton>
        <View style={styles.textHolder}>
          <Text style={styles.nearText}>Requests near</Text>
          <Text style={styles.cityText}>Southampton, UK</Text>
        </View>
        <IconButton style={{ marginRight: "0.5rem" }}>
          <SvgIcon
            component={CreateIcon}
            style={{ width: 18, height: 18 }}
          ></SvgIcon>
        </IconButton>
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
    marginHorizontal: "2em",
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
