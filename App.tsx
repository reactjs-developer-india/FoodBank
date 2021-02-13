import React, { useState } from "react";
import DonateOrVolunteer from "./features/DonateOrVolunteer";
import PostcodeAndName from "./features/PostcodeAndName";

export default function App() {
  const [page, setPage] = useState("DonateOrVolunteer");

  return (
    <>
      {page === "DonateOrVolunteer" && <DonateOrVolunteer setPage={setPage} />}
      {page === "DonateMain" && <PostcodeAndName setPage={setPage} />}
    </>
  );
}
