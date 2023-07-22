import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:8080/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = (token: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
