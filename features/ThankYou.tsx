import { useFonts } from "@use-expo/font";
import { BalooThambi_Regular400 } from "@expo-google-fonts/baloo-thambi";
import { Cairo_700Bold } from "@expo-google-fonts/cairo";
import styled from "styled-components/native";
import React from "react";
import { StyleSheet, Text, SafeAreaView, ImageBackground } from "react-native";
import { IconButton, SvgIcon } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const SafeHeading = styled.SafeAreaView`
  display: flex;
  flex: 0.1;
  align-items: center;
`;

const Heading = styled.View`
  display: flex;
  flex: 1.9;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


export default function ThankYou({ setPage }) {
  let [fontsLoaded] = useFonts({
    BalooThambi_Regular400,
    Cairo_700Bold,
  });

  return (
    <ImageBackground
      source={require("../assets/splashImage2.png")}
      style={styles.container}
      imageStyle={{
        position: "absolute",
        right: "-80vw",
        borderRadius: 600,
        opacity: 0.13,
      }}
    >
      <SafeHeading>
        <Text style={styles.heading}>FOOD</Text>
        <Text style={styles.heading}>BANK</Text>
      </SafeHeading>
      <Heading>
        <SvgIcon 
        component={CheckCircleIcon}
        style={{ width: 98, height: 98, color: "#f66a6b"}}></SvgIcon>
        <Text style={styles.subheading}>Thank You!</Text>

      </Heading>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "hidden",
  },
  heading: {
    fontSize: 44,
    height: 35,
    fontFamily: "BalooThambi_Regular400",
    color: "#f66a6b",
    textShadowColor: "rgba(63,107,169, 0.2)",
    textShadowOffset: { width: 2, height: 2 },
  },
  subheading:{
    fontSize: 35,
    height: 20,
    fontFamily: "BalooThambi_Regular400",
    color: "#f66a6b",
    textShadowColor: "rgba(63,107,169, 0.2)",
    textShadowOffset: { width: 2, height: 2 },
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
});
