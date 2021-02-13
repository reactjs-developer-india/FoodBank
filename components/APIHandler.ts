import { useQuery } from "react-query";

export const APIURL = "https://foodbank--backend.herokuapp.com/";

function fetchFoodBanks(postcode) {
  const { isLoading, error, data } = useQuery("data", () =>
    fetch(APIURL + "findfoodbanks?postcode=" + postcode.postcode).then((res) =>
      res.json()
    )
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return data;
}

function donate(username, postcode, info) {
  info["username"] = username;
  info["postcode"] = postcode;
  const { isLoading, error, data } = useQuery("data", () =>
    fetch(APIURL + "donate", {
      method: "POST",
      body: info,
    }).then((res) => res.json())
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return data;
}

function userDonations(username) {
  const { isLoading, error, data } = useQuery("data", () =>
    fetch(APIURL + "userdonations?username=" + username).then((res) =>
      res.json()
    )
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return data;
}

function getAllDonations() {
  const { isLoading, error, data } = useQuery("data", () =>
    fetch(APIURL + "getalldonations").then((res) => res.json())
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return data;
}

function changeDonationStatus(donationid, status) {
  const { isLoading, error, data } = useQuery("data", () =>
    fetch(
      APIURL + "changestatus?donationid=" + donationid + "&status=" + status
    ).then((res) => res.json())
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return data;
}
