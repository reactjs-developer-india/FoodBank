import { useFonts } from "@use-expo/font";
import { BalooThambi_Regular400 } from "@expo-google-fonts/baloo-thambi";
import { Cairo_700Bold } from "@expo-google-fonts/cairo";
import styled from "styled-components/native";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Input, TextField, IconButton, SvgIcon } from "@material-ui/core";
import useDispatch from "../common/hooks/useDispatch";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

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

const InputContainer = styled.View`
  display: flex;
  flex: 1;
  width: 65%;
  justify-content: center;
  flex-direction: column;

  margin-bottom: 1em;
`;

const PressableButton = ({ disabled, onPress, colour, text }) => (
  <Button
    disabled={disabled}
    onPress={onPress}
    styles={styles.buttonElevation}
    colour={colour}
  >
    <ButtonText style={styles.buttonText}>{text}</ButtonText>
  </Button>
);

export default function DonateOrVolunteer({ setPage }) {
  let [fontsLoaded] = useFonts({
    BalooThambi_Regular400,
    Cairo_700Bold,
  });
  const [name, setName] = useState("");
  const [postcode, setPostcode] = useState("");
  const dispatch = useDispatch();

  return (
    <ImageBackground
      source={require("../assets/splashImage.png")}
      style={styles.container}
      imageStyle={{
        position: "absolute",
        left: "-80vw",
        borderRadius: 600,
        opacity: 0.1,
      }}
    >
      <IconButton
        style={{
          backgroundColor: "#F7F4F3",
          position: "absolute",
          top: "1rem",
          left: "1rem",
        }}
        onClick={() => setPage("DonateOrVolunteer")}
      >
        <SvgIcon component={KeyboardArrowLeftIcon} style={{ opacity: 0.7 }} />
      </IconButton>
      <Heading>
        <Text style={styles.heading}>FOOD</Text>
        <Text style={styles.heading}>BANK</Text>
      </Heading>
      <InputContainer>
        <TextField
          fullWidth
          label="Enter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          style={{ marginTop: "1.5em" }}
          label="Enter Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.replace(/\s/g, ""))}
        />
      </InputContainer>
      <ButtonContainer>
        <PressableButton
          disabled={!name || !postcode}
          onPress={() => {
            dispatch({ type: "login/update", name: name, postcode: postcode });
            setPage("SelectFoodbank");
          }}
          text={"Locate"}
          colour={"#f66a6b"}
        />
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
  textField: {
    width: "90%",
  },
});
