import React, { useState } from "react";
import { Text } from "react-native";
import DonateOrVolunteer from "./features/DonateOrVolunteer";

export default function App() {
  const [page, setPage] = useState("DonateOrVolunteer");

  return (
    <>
      {page === "DonateOrVolunteer" && <DonateOrVolunteer setPage={setPage} />}
      {page === "DonateMain" && <Text>Hi</Text>}
    </>
  );
}
