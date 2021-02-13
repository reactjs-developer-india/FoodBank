import React from "react";
import FoodBank from "../components/FoodBank";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Button, View } from "react-native";
import { IconButton, Avatar, Paper } from "@material-ui/core";
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
    <View style={{ paddingHorizontal: "1em" }}>
      <FoodBankCard />
      <FoodBankCard />
      <FoodBankCard />
      <FoodBankCard />
      <FoodBankCard />
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
