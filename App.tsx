import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border-radius: 50px;
  background-color: #f66a6b;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex: 1;
  width: 95%;
  justify-content: center;
  flex-direction: column;
`;

const PressableButton = ({ text }) => (
  <Button>
    <ButtonText>{text}</ButtonText>
  </Button>
);

export default function App() {
  return (
    <Container style={styles.container}>
      <Text>FOOD</Text>
      <Text>BANK</Text>
      <ButtonContainer>
        <PressableButton text={"Bruh"}></PressableButton>
        <PressableButton text={"Bruh"}></PressableButton>
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
});
