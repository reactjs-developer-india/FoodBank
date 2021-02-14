import styled from "styled-components/native";
import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {
  IconButton,
  SvgIcon,
  Avatar,
  Paper,
  CircularProgress,
  Button,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CreateIcon from "@material-ui/icons/Create";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import {
  Cabin_600SemiBold,
  Cabin_400Regular,
  Cabin_500Medium,
} from "@expo-google-fonts/cabin";
import { useFonts } from "@use-expo/font";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import useDispatch from "../common/hooks/useDispatch";
import { doGetAllDonations } from "../state";
import { api } from "../store";
import useSelector from "../common/hooks/useSelector";
import { format, parse } from "date-fns";

const markers = [
  { lat: 50.9397, lng: -1.3974, postcode: "SO16 3GQ", date: "12/05/21" },
  { lat: 50.9396, lng: -1.3943, postcode: "SO15 5QL", date: "12/05/21" },
];

export default function VolunteerMap({ setPage }) {
  const [selected, setSelected] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpH_QuxnpFgRAWONd22YJODpC-XuRuQGY",
  });
  let [fontsLoaded] = useFonts({
    Cabin_600SemiBold,
    Cabin_500Medium,
    Cabin_400Regular,
  });

  const dispatch = useDispatch();
  const { donations, pending, error } = useSelector(
    (state) => state.allDonation
  );

  React.useEffect(() => {
    dispatch(doGetAllDonations());
  }, []);

  const acceptDonation = () => {
    try {
      api.get(
        "changestatus?donationid=" + selected.donationid + "&status=InProgress"
      );
    } catch {
      return;
    }
  };

  const completeDonation = () => {
    try {
      api.get(
        "changestatus?donationid=" + selected.donationid + "&status=Completed"
      );
    } catch {
      return;
    }
  };

  return (
    <View style={{ display: "flex" }}>
      <View style={styles.topBar}>
        <IconButton onClick={() => setPage("DonateOrVolunteer")}>
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
          {donations &&
            !pending &&
            donations.map((marker, i) => (
              <Marker
                key={i}
                position={{ lat: marker.start_lat, lng: marker.start_lon }}
                onClick={() => setSelected(marker)}
              />
            ))}
          {selected && (
            <InfoWindow
              position={{ lat: selected.start_lat, lng: selected.start_lon }}
              onCloseClick={() => setSelected(null)}
            >
              <>
                <View>
                  <Text>
                    <strong>Donator: </strong>
                    {selected.username}
                  </Text>
                  <Text>
                    <strong>Pickup Location: </strong>
                    {selected.postcode
                      .toUpperCase()
                      .substring(0, selected.postcode.length - 3)}{" "}
                    {selected.postcode
                      .toUpperCase()
                      .substring(selected.postcode.length - 3)}
                  </Text>
                  <Text style={{ marginTop: 10 }}>
                    <strong>Destination:</strong> {selected.info.name}
                  </Text>
                  <Text>{selected.destination}</Text>
                  <Text>
                    <strong>Date And Time: </strong>
                    {format(
                      new Date(selected.info.dateTime),
                      "EEEE, MMMM do, yyyy hh:mm a"
                    )}
                  </Text>
                  <Text style={{ marginTop: 10 }}>
                    <strong>Additional Notes:</strong>{" "}
                    {selected.info.additional}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "1rem",
                  }}
                >
                  <Button
                    variant="outlined"
                    style={{ color: "orange", borderColor: "orange", flex: 1 }}
                    onClick={acceptDonation}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      color: "green",
                      borderColor: "green",
                      flex: 1,
                      marginLeft: 10,
                    }}
                    onClick={completeDonation}
                  >
                    Complete
                  </Button>
                </View>
              </>
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
          {pending && <CircularProgress style={{ alignSelf: "center" }} />}
          {error && <Text>Backend is down</Text>}
          {donations &&
            donations.map((e) => (
              <PersonCard onClick={() => setSelected(e)} {...e} />
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

function PersonCard({
  onClick,
  info: { image, dateTime, name, priority },
  username,
  status,
}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#A39B9B",
        padding: "1em",
        marginBottom: "1rem",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowColor: "black",
        shadowOffset: { height: 2, width: 4 },
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Avatar
          src={image}
          style={{ height: 80, width: 80 }}
          component={Paper}
          elevation={2}
        />
        <View style={{ paddingLeft: "1rem" }}>
          <Text
            style={{
              fontSize: 22,
              color: "white",
              fontWeight: "600",
              fontFamily: "Cabin_600SemiBold",
              alignSelf: "flex-start",
            }}
          >
            {username}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "white",
              opacity: 0.5,
              fontWeight: "500",
              fontFamily: "Cabin_500Medium",
              alignSelf: "flex-start",
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              opacity: 0.3,
              fontWeight: "500",
              fontFamily: "Cabin_500Medium",
              alignSelf: "flex-start",
            }}
          >
            {format(new Date(dateTime), "dd/MM HH:mm")}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Cabin_600SemiBold",
            color: "white",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 20,
            backgroundColor:
              priority === "High"
                ? "#F66A6B"
                : priority === "Medium"
                ? "#F6C06A"
                : "#80CE76",
            alignSelf: "flex-end",
          }}
        >
          {priority === "High" ? "Urgent" : priority}
        </Text>
        <View>
          <Text
            style={{
              fontFamily: "Cabin_600SemiBold",
              color: "white",
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginTop: 10,
              borderRadius: 20,
              backgroundColor: status === "Pending" ? "#80CE76" : "#F6C06A",
              alignSelf: "flex-end",
            }}
          >
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    padding: 3,
    paddingRight: 10,
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
    fontFamily: "Cabin_600SemiBold",
  },
  relevantText: {
    fontSize: 18,
    marginLeft: "1rem",
    color: "#707070",
    opacity: 0.5,
    fontWeight: "600",
    fontFamily: "Cabin_600SemiBold",
  },
});
