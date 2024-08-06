import { toast } from "react-toastify";
import { getAccessToken, getUser, logoutUser } from "../axios/useraxios";
import { setUser } from "./userSlice";

export const getUserAction = () => async (dispatch) => {
  //call axios to get user
  const result = await getUser();
  if (result?.error) {
    return toast.error(result.message);
  }
  dispatch(setUser(result.data));
};
//AutoLogin
export const autoLoginAction = () => async (dispatch) => {
  //check if the access token exists
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  //if no acces token , get new access token based on the refresh  token
  if (!accessJWT && refreshJWT) {
    //cal axios to get new access token
    const result = await getAccessToken();
    if (result.status === "success") {
      //store new access token
      sessionStorage.setItem("accessJWT", result.data);
      dispatch(getUserAction());
    }
  }
  //if access token present , get user info
  dispatch(getUserAction());
};

// Logout  user
export const logoutUserAction = () => async (dispatch) => {
  //call api to log out user from api  as well
  const result = await logoutUser();

  if (result.status === "error") {
    return toast.error(result.message);
  }
  // remove tokens from browser storagre
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");

  // clear user state
  dispatch(setUser({}));
};
