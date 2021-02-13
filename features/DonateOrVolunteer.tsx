import { useFonts } from "@use-expo/font";
import { BalooThambi_Regular400 } from "@expo-google-fonts/baloo-thambi";
import { Cairo_700Bold } from "@expo-google-fonts/cairo";
import styled from "styled-components/native";
import React from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";

const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${(props) => props.colour};
  margin-top: 1em;
  height: 4em;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: white;
`;

const Heading = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex: 1;
  width: 80%;
  justify-content: center;
  flex-direction: column;

  margin-bottom: 1em;
`;

const PressableButton = ({ onPress, colour, text }) => (
  <Button onPress={onPress} styles={styles.buttonElevation} colour={colour}>
    <ButtonText style={styles.buttonText}>{text}</ButtonText>
  </Button>
);

export default function DonateOrVolunteer({ setPage }) {
  let [fontsLoaded] = useFonts({
    BalooThambi_Regular400,
    Cairo_700Bold,
  });

  return (
    <ImageBackground
      source={require("../assets/splashImage.png")}
      style={styles.container}
      imageStyle={{
        position: "absolute",
        right: "-80vw",
        borderRadius: 600,
        opacity: 0.1,
      }}
    >
      <Heading>
        <Text style={styles.heading}>FOOD</Text>
        <Text style={styles.heading}>BANK</Text>
      </Heading>
      <ButtonContainer>
        <PressableButton
          onPress={() => setPage("DonateMain")}
          text={"Donate"}
          colour={"#f66a6b"}
        />
        <PressableButton
          onPress={() => setPage("VolunteerMain")}
          text={"Volunteer"}
          colour={"#A39B9B"}
        ></PressableButton>
      </ButtonContainer>
    </ImageBackground>
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
  heading: {
    fontSize: 80,
    height: 60,
    fontFamily: "BalooThambi_Regular400",
    color: "#f66a6b",
    textShadowColor: "rgba(63,107,169, 0.5)",
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
