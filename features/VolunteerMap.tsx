import styled from "styled-components/native";
import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { IconButton, SvgIcon } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CreateIcon from "@material-ui/icons/Create";

const markers = [
  { lat: 50.9397, lng: -1.3974, postcode: "SO16 3GQ", date: "12/05/21" },
  { lat: 50.9396, lng: -1.3943, postcode: "SO15 5QL", date: "12/05/21" },
];

export default function VolunteerMap({ setPage }) {
  const [selected, setSelected] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpH_QuxnpFgRAWONd22YJODpC-XuRuQGY",
  });

  return (
    <View style={{ display: "flex" }}>
      <View style={styles.topBar}>
        <IconButton onClick={() => setPage("DonateMain")}>
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
        >
          {markers.map((marker, i) => (
            <Marker
              key={i}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelected(marker)}
            />
          ))}
          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <View>
                <Text>{selected.postcode}</Text>
                <Text>{selected.date}</Text>
              </View>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
      <View style={styles.bottomCard}>
        <View style={styles.dragNub}></View>
        <View style={styles.filters}>
          <Text style={styles.nearestText}>Nearest</Text>
          <Text style={styles.relevantText}>Most Relevant</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.donations}
        >
          <Text>Bottom</Text>
        </ScrollView>
      </View>
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
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
  },
  bottomCard: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    paddingVertical: "1rem",
    paddingHorizontal: "2em",
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    minHeight: "35%",
    maxHeight: "35%",
    bottom: 1,
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    zIndex: 10,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
  },
  dragNub: {
    borderRadius: 40,
    height: 5,
    width: "10%",
    backgroundColor: "#707070",
    marginBottom: "1rem",
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  donations: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginTop: "1rem",
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
  nearestText: {
    fontSize: 18,
    color: "#707070",
    fontWeight: "600",
  },
  relevantText: {
    fontSize: 18,
    marginLeft: "1rem",
    color: "#707070",
    opacity: 0.5,
    fontWeight: "600",
  },
});
