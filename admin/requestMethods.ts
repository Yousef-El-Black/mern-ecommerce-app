import axios from "axios";
import { useSelector } from "react-redux";

// const accessToken = useSelector(
//   (state: any) => state.user.currentUser.accessToken
// );

const BASE_URL = "http://localhost:8080/api/";
// const TOKEN = accessToken;
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTdjNzNhNjhlMGMzMDJlNDZjMGRhZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4OTI2MTUxMiwiZXhwIjoxNjg5NTIwNzEyfQ.OQHb-YuDeu1agAAe7ycei1DwFrhUlm6mqbihxfShPXk";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = (token: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
