import React, { useState } from "react";
import DonateOrVolunteer from "./features/DonateOrVolunteer";
import PostcodeAndName from "./features/PostcodeAndName";
import VolunteerMap from "./features/VolunteerMap";
import FoodBankList from "./features/FoodBankPage";
import ConfirmDonation from "./features/ConfirmDonation";
import ThankYou from "./features/ThankYou";
import PreviousDonations from "./features/PreviousDonations";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  const [page, setPage] = useState("DonateOrVolunteer");

  return (
    <>
      <Provider store={store}>
        {page === "DonateOrVolunteer" && (
          <DonateOrVolunteer setPage={setPage} />
        )}
        {page === "DonateMain" && <PostcodeAndName setPage={setPage} />}
        {page === "SelectFoodbank" && <FoodBankList setPage={setPage} />}
        {page === "VolunteerMain" && <VolunteerMap setPage={setPage} />}
        {page === "FoodbankList" && <FoodBankList setPage={setPage} />}
        {page === "ConfirmDonation" && <ConfirmDonation setPage={setPage} />}
        {page === "PreviousDonations" && (
          <PreviousDonations setPage={setPage} />
        )}
        {page === "ThankYou" && <ThankYou setPage={setPage} />}
      </Provider>
    </>
  );
}
