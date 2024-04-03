import axios from "axios";
import queryString from "query-string";

const PLACE_API_URL = "/api/places";
export const getPlace = async () => {
  const res = await axios.get(PLACE_API_URL);
  return res.data;
};

export const postPlace = async (params: any) => {
  const res = await axios.post(PLACE_API_URL, queryString.stringify(params), {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
};
