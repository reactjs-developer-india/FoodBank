import React, { useState } from "react";
import DonateOrVolunteer from "./features/DonateOrVolunteer";
import PostcodeAndName from "./features/PostcodeAndName";
import VolunteerMap from "./features/VolunteerMap";
import FoodBankList from "./features/FoodBankPage";
import ConfirmDonation from "./features/ConfirmDonation";
import ThankYou from "./features/ThankYou";
import PreviousDonations from "./features/PreviousDonations";
import { LoginContext } from "./components/state";

export default function App() {
  const [page, setPage] = useState("DonateOrVolunteer");
  const [name, setName] = useState("");
  const [postcode, setPostcode] = useState("");

  const contextValue = { name, setName, postcode, setPostcode };

  return (
    <>
      <LoginContext.Provider value={contextValue}>
        {page === "DonateOrVolunteer" && (
          <DonateOrVolunteer setPage={setPage} />
        )}
        {page === "DonateMain" && <PostcodeAndName setPage={setPage} />}
        {page === "VolunteerMain" && <VolunteerMap setPage={setPage} />}
        {page === "FoodbankList" && <FoodBankList setPage={setPage} />}
        {page === "ConfirmDonation" && <ConfirmDonation setPage={setPage} />}
        {page === "PreviousDonations" && (
          <PreviousDonations setPage={setPage} />
        )}
        {page === "ThankYou" && <ThankYou setPage={setPage} />}
      </LoginContext.Provider>
    </>
  );
}
