import axios from "axios";
import queryString from "query-string";

const PLACE_API_URL = "/api/places";
export const getPlace = async () => {
  return await axios.get(PLACE_API_URL);
};

export const postPlace = async (params: any) => {
  return await axios.post(PLACE_API_URL, queryString.stringify(params), {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
};
