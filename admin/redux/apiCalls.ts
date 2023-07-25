import { publicRequest } from "@/requestMethods";
import { loginFailure, loginStart, loginSuccess, resetUser } from "./userRedux";

export const login = async (dispatch: any, user: any) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch: any) => {
  dispatch(resetUser());
};
