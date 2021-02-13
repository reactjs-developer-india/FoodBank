import React, { useState } from "react";
import DonateOrVolunteer from "./features/DonateOrVolunteer";
import PostcodeAndName from "./features/PostcodeAndName";
import VolunteerMap from "./features/VolunteerMap";

export default function App() {
  const [page, setPage] = useState("DonateOrVolunteer");

  return (
    <>
      {page === "DonateOrVolunteer" && <DonateOrVolunteer setPage={setPage} />}
      {page === "DonateMain" && <PostcodeAndName setPage={setPage} />}
      {page === "VolunteerMain" && <VolunteerMap setPage={setPage} />}
    </>
  );
}
