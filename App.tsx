import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${(props) => props.colour};
  margin-top: 1em;
  height: 3em;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: white;
`;

const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
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

const PressableButton = ({ colour, text }) => (
  <Button colour={colour}>
    <ButtonText style={styles.buttonText}>{text}</ButtonText>
  </Button>
);

export default function App() {
  return (
    <Container style={styles.container}>
      <Heading>
        <Text style={styles.heading}>FOOD</Text>
        <Text style={styles.heading}>BANK</Text>
      </Heading>
      <ButtonContainer>
        <PressableButton text={"Donate"} colour={"#f66a6b"} />
        <PressableButton
          text={"Volunteer"}
          colour={"#A39B9B"}
        ></PressableButton>
      </ButtonContainer>
    </Container>
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
  },
  heading: {
    fontSize: 80,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 20,
  },
});
