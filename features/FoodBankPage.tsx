import React from "react";
import FoodBank from "../components/FoodBank";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Button, ScrollView, View } from "react-native";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { IconButton, Avatar, SvgIcon, Paper } from "@material-ui/core";
import { StyleSheet, Text } from "react-native";
import {
  Cabin_600SemiBold,
  Cabin_400Regular,
  Cabin_500Medium,
} from "@expo-google-fonts/cabin";
import { useFonts } from "@use-expo/font";

export default function FoodBankList({ setPage }) {
  let [fontsLoaded] = useFonts({
    Cabin_600SemiBold,
    Cabin_500Medium,
    Cabin_400Regular,
  });

  return (
    <View style={styles.parent}>
      <View style={styles.topBar}>
        <IconButton onClick={() => setPage("DonateMain")}>
          <SvgIcon component={KeyboardArrowLeftIcon}></SvgIcon>
        </IconButton>
        <View style={styles.textHolder}>
          <Text style={styles.nearText}>Foodbanks near</Text>
          <Text style={styles.cityText}>Southampton, UK</Text>
        </View>
      </View>
      <ScrollView
        style={{ paddingHorizontal: "1em", width: "100%" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <FoodBankCard />
        <FoodBankCard />
        <FoodBankCard />
        <FoodBankCard />
        <FoodBankCard />
        <FoodBankCard />
        <FoodBankCard />
        <FoodBankCard />
      </ScrollView>
    </View>
  );
}

function FoodBankCard({}) {
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
        src="https://material-ui.com/static/images/avatar/2.jpg"
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
          Andy Petrov
        </Text>
        <Text
          style={{
            color: "white",
            opacity: 0.5,
            fontFamily: "Cabin_500Medium",
            alignSelf: "flex-start",
          }}
        >
          Distance
        </Text>
        <Text
          style={{
            fontFamily: "Cabin_600SemiBold",
            color: "white",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 20,
            backgroundColor: "#F66A6B",
            alignSelf: "flex-start",
            marginTop: "1rem",
          }}
        >
          URGENT
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
  textHolder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "2em",
    marginTop: "0.3rem",
    marginBottom: "0.5rem",
  },
  topBar: {
    display: "flex",
    flex: 1,
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
});
