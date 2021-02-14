import { useFonts } from "@use-expo/font";
import { BalooThambi_Regular400 } from "@expo-google-fonts/baloo-thambi";
import { Cairo_700Bold, Cairo_400Regular } from "@expo-google-fonts/cairo";
import styled from "styled-components/native";
import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import {
  IconButton,
  SvgIcon,
  Avatar,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import {
  Cabin_600SemiBold,
  Cabin_400Regular,
  Cabin_500Medium,
} from "@expo-google-fonts/cabin";

import useDispatch from "../common/hooks/useDispatch";
import useSelector from "../common/hooks/useSelector";
import { doGetPastDonations } from "../state";
import { differenceInDays } from "date-fns";

const PageContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  justifycontent: center;
  padding: 1em;
`;

export default function PreviousDonations({ setPage }) {
  let [fontsLoaded] = useFonts({
    Cabin_600SemiBold,
    Cabin_500Medium,
    Cabin_400Regular,
    BalooThambi_Regular400,
    Cairo_700Bold,
    Cairo_400Regular,
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(doGetPastDonations());
  }, []);

  const { donations, pending, image, error } = useSelector(
    (state) => state.donationList
  );
  const { name, postcode } = useSelector((state) => state.login);
  let uPostcode = postcode.toUpperCase();

  return (
    <PageContainer>
      {donations && (
        <>
          <IconButton
            style={{
              backgroundColor: "#F7F4F3",
              position: "absolute",
              top: "1rem",
              left: "1rem",
            }}
            onClick={() => setPage("FoodbankList")}
          >
            <SvgIcon component={HomeIcon} style={{ opacity: 0.7 }} />
          </IconButton>
          <Avatar
            elevation={2}
            component={Paper}
            src={image}
            style={{ height: 100, width: 100, alignSelf: "center" }}
          />
          <Text style={styles.normalText}>{name}</Text>
          <Text style={styles.locationText}>
            {uPostcode.substring(0, uPostcode.length - 3)}{" "}
            {uPostcode.substring(uPostcode.length - 3)}
          </Text>
          <Text style={styles.headText}>Past Donations</Text>
          <ScrollView
            style={{ paddingHorizontal: 10, width: "100%" }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {donations &&
              !pending &&
              donations.map((e) => <FoodBankCard {...e} />)}
          </ScrollView>
          <Text
            style={{
              marginTop: "auto",
              fontSize: 24,
              lineHeight: 28,
              alignSelf: "center",
              marginBottom: "1em",
              fontFamily: "Cairo_700Bold",
              width: "50%",
              textAlign: "center",
              opacity: 0.4,
              color: "#40434E",
            }}
          >
            Thank you for being awesome!
          </Text>
        </>
      )}
      {pending && <CircularProgress style={{ alignSelf: "center" }} />}
      {error && <Text>Backend is down</Text>}
    </PageContainer>
  );
}

function FoodBankCard({ info: { image, dateTime, name }, status }) {
  return (
    <View
      style={{
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#A39B9B",
        padding: "1em",
        marginBottom: "1rem",
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowColor: "black",
        shadowOffset: { height: 2, width: 4 },
      }}
    >
      <Avatar
        component={Paper}
        elevation={2}
        src={image}
        style={{ height: 80, width: 80 }}
      />
      <View
        style={{
          paddingLeft: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "white",
            fontWeight: "600",
            fontFamily: "Cabin_600SemiBold",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: "white",
            opacity: 0.5,
            fontFamily: "Cabin_500Medium",
            alignSelf: "flex-start",
          }}
        >
          {differenceInDays(Date.now(), new Date(dateTime))} days ago
        </Text>
        <Text
          style={{
            fontFamily: "Cabin_600SemiBold",
            color: "white",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 20,
            backgroundColor: "#80CE76",
            opacity: 0.8,
            marginLeft: "auto",
            alignSelf: "flex-start",
            marginTop: "1rem",
          }}
        >
          {status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "hidden",
  },
  buttonText: {
    fontSize: 25,
    fontFamily: "Cairo_700Bold",
  },
  buttonElevation: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textField: {
    width: "90%",
  },
  normalText: {
    alignSelf: "center",
    fontSize: 24,
    height: 34,
    fontFamily: "Cairo_700Bold",
  },
  headText: {
    alignSelf: "flex-start",
    fontSize: 20,
    padding: 5,
    fontFamily: "Cairo_700Bold",
  },
  locationText: {
    alignSelf: "center",
    fontSize: 14,
    color: "#A9A9A9",
    fontFamily: "Cairo_400Regular",
    opacity: 0.7,
  },
  contactText: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: "#87CEEB",
    textDecorationLine: "underline",
    marginLeft: "0.5rem",
  },
  row: {
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
  },
  iconHolder: {
    flexDirection: "row",
    display: "flex",
    marginLeft: 10,
  },
  need: {
    padding: 5,
    backgroundColor: "#C6C5C5",
    color: "white",
    borderRadius: 30,
    marginLeft: "1rem",
    fontSize: 14,
    marginTop: 10,
    fontWeight: "500",
  },
});
