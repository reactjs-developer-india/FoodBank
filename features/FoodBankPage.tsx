import React from "react";
import FoodBank from "../components/FoodBank";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Button, ScrollView, View } from "react-native";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { IconButton, Avatar, SvgIcon, Paper } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
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
        <IconButton
          style={{ backgroundColor: "#F7F4F3" }}
          onClick={() => setPage("DonateMain")}
        >
          <SvgIcon component={KeyboardArrowLeftIcon} style={{ opacity: 0.7 }} />
        </IconButton>
        <View style={styles.textHolder}>
          <Text style={styles.nearText}>Foodbanks near</Text>
          <Text style={styles.cityText}>Southampton, UK</Text>
        </View>
        <IconButton
          style={{ marginRight: "0.5rem", backgroundColor: "#F7F4F3" }}
        >
          <SvgIcon
            component={CreateIcon}
            style={{ width: 18, height: 18, opacity: 0.7 }}
          />
        </IconButton>
      </View>
      <View style={styles.filters}>
        <Text style={styles.nearestText}>Nearest</Text>
        <Text style={styles.relevantText}>Most Relevant</Text>
      </View>
      <ScrollView
        style={{ paddingHorizontal: 10, width: "100%" }}
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
    maxHeight: "100vh",
    padding: "1em",
  },
  nearText: {
    color: "#707070",
    fontSize: 16,
  },
  cityText: {
    fontWeight: "600",
    color: "black",
    fontSize: 20,
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginVertical: "1rem",
    marginLeft: 15,
  },
  nearestText: {
    fontSize: 18,
    color: "#707070",
    fontWeight: "600",
    opacity: 0.5,
    fontFamily: "Cabin_600SemiBold",
  },
  relevantText: {
    fontSize: 18,
    marginLeft: "1rem",
    color: "#707070",
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
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignSelf: "center",
    backgroundColor: "white",
    height: "5em",
  },
});
