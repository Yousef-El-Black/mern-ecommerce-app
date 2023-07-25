import axios from "axios";
import { apiUrl } from "./environment/environment";

const BASE_URL = `${apiUrl}api/`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = (token: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
