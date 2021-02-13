import { useFonts } from "@use-expo/font";
import { BalooThambi_Regular400 } from "@expo-google-fonts/baloo-thambi";
import { Cairo_700Bold, Cairo_400Regular } from "@expo-google-fonts/cairo";
import styled from "styled-components/native";
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { StyleSheet, Text, ImageBackground, View } from "react-native";
import {
  IconButton,
  SvgIcon,
  Avatar,
  Paper,
  TextField,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import {
  Cabin_600SemiBold,
  Cabin_400Regular,
  Cabin_500Medium,
} from "@expo-google-fonts/cabin";

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

const ButtonContainer = styled.View`
  display: flex;
  flex: 1;
  width: 80%;
  justify-content: center;
  flex-direction: column;
  align-self: center;

  margin-bottom: 1em;
`;

const PageContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  justifycontent: center;
  padding: 1em;
`;

const PressableButton = ({ onPress, colour, text }) => (
  <Button onPress={onPress} styles={styles.buttonElevation} colour={colour}>
    <ButtonText style={styles.buttonText}>{text}</ButtonText>
  </Button>
);

export default function ConfirmDonation({ setPage }) {
  const needs = [
    "Dried Spaghetti",
    "Bread",
    "Cheese",
    "Mom's Spaghetti",
    "Poggercino",
  ];
  const name = "Big Food Bank";
  const location = "Southampton, UK";
  const phone = "012345678";
  const email = "food@bank.com";

  const [dateTime, setDateTime] = useState("");
  const [additional, setAdditional] = useState("");

  let [fontsLoaded] = useFonts({
    Cabin_600SemiBold,
    Cabin_500Medium,
    Cabin_400Regular,
    BalooThambi_Regular400,
    Cairo_700Bold,
    Cairo_400Regular,
  });

  return (
    <PageContainer>
      <IconButton
        style={{
          backgroundColor: "#F7F4F3",
          position: "absolute",
          top: "1rem",
          left: "1rem",
        }}
        onClick={() => setPage("DonateMain")}
      >
        <SvgIcon component={KeyboardArrowLeftIcon} style={{ opacity: 0.7 }} />
      </IconButton>
      <Avatar
        elevation={2}
        component={Paper}
        src="https://material-ui.com/static/images/avatar/2.jpg"
        style={{ height: 100, width: 100, alignSelf: "center" }}
      />
      <Text style={styles.normalText}> {name}</Text>
      <Text style={styles.locationText}> {location} </Text>
      <Text style={styles.headText}> Needs </Text>
      <View style={styles.row}>
        {needs.map((e) => (
          <Text style={styles.need}> {e} </Text>
        ))}
      </View>
      <Text style={styles.headText}> Date </Text>
      <TextField
        type="datetime-local"
        value={dateTime}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginLeft: 10 }}
        onChange={(e) => setDateTime(e.target.value)}
      />
      <Text style={styles.headText}> Additional Notes </Text>
      <TextField
        id="standard-multiline-static"
        multiline
        rows={3}
        style={{ marginLeft: 10 }}
        value={additional}
        onChange={(e) => setAdditional(e.target.value)}
      />
      <Text style={styles.headText}> Contact </Text>
      <View style={styles.iconHolder}>
        <SvgIcon component={PhoneIcon}></SvgIcon>
        <Text style={styles.contactText}>{phone}</Text>
      </View>

      <View style={styles.iconHolder}>
        <SvgIcon component={MailIcon}></SvgIcon>
        <Text style={styles.contactText}>{email}</Text>
      </View>

      <ButtonContainer>
        <PressableButton
          onPress={() => setPage("SelectFoodbank")}
          text={"Confirm"}
          colour={"#f66a6b"}
        />
      </ButtonContainer>
    </PageContainer>
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
