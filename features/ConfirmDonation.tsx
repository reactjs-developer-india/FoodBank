import { useFonts } from "@use-expo/font";
import { BalooThambi_Regular400 } from "@expo-google-fonts/baloo-thambi";
import { Cairo_700Bold } from "@expo-google-fonts/cairo";
import styled from "styled-components/native";
import React from "react";
import { StyleSheet, Text, ImageBackground, View } from "react-native";
import { IconButton, SvgIcon } from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

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

const PageContainer = styled.View`
	display: flex;
	flex-direction: column;
    flex: 1;
    justify-content: center;
`;

const FoodBankComponent = styled.View`
	display: flex;
	flex-direction: column;
`;

const PressableButton = ({ onPress, colour, text }) => (
  <Button onPress={onPress} styles={styles.buttonElevation} colour={colour}>
    <ButtonText style={styles.buttonText}>{text}</ButtonText>
  </Button>
);

const ContactInformation = ({icon, text}) => (
   <View>
        <SvgIcon
           component={icon}
           style={{ width: 18, height: 18 }}
         ></SvgIcon>
        <Text>{text}</Text>
   </View>
);



export default function ConfirmDonation({ setPage }) {

    const needs = ["Dried Spaghetti", "Bread", "Cheese"]
    const name = "Big Food Bank"
    const location = "Southampton"
    const phone = "012345678"
    const email = "food@bank.com"
	return(
	<PageContainer>
        
        <Text style={styles.normalText}> {name}</Text>
        <Text style={styles.locationText}> {location} </Text>
        <Text style={styles.headText}> Needs </Text>
         <View style={styles.row}>
           { needs.map(e => <Text style={styles.need}> {e} </Text>) }
        </View>
        <Text style={styles.headText}> Date </Text>
        <Text style={styles.headText}> Additional Notes </Text>
        <Text style={styles.headText}> Contact </Text>

        <View style={styles.row}>
           <SvgIcon
               component={PhoneIcon}
               style={{ width: 18, height: 18 }}
            ></SvgIcon>
            <Text style={styles.contactText}> {phone} </Text>
        </View>  
       
        <View style={styles.row}>
            <SvgIcon
               component={MailIcon}
               style={{ width: 18, height: 18 }}
            ></SvgIcon>
            <Text style={styles.contactText}> {email} </Text>
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
    normalText: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Cairo_700Bold",
  },

   headText: {
    alignSelf: "left",
    fontSize: 20,
    padding: 5,
    //fontFamily: "Cairo_700Bold",
   },
   locationText: {
    alignSelf: "center",
    fontSize: 16,
    color: "#A9A9A9",
   },
   contactText: {
    alignSelf: "left",
    fontSize: 12,
    color: "#A9A9A9",
   },

    row: {
    flexDirection: "row",
    display: "flex",
    },

    need: {
    padding: 5,
    backgroundColor: "#404040",
    color: "#F5F5F5",
    borderRadius: 30,
    marginLeft: "1rem",
    },
});