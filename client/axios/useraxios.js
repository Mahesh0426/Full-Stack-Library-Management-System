import axios from "axios";

const USER_API_URL = "http://localhost:8000/api/user";

// Create  a USer | Signup
export const createUser = (userObj) => {
  const response = axios
    .post(USER_API_URL, userObj)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });

  return response;
};

// CREAte |userLogin | post |send
export const loginUser = (userObj) => {
  const response = axios
    .post(`${USER_API_URL}/login`, userObj)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
  return response;
};

// private Endpoints
export const getUser = () => {
  const response = axios
    .get(USER_API_URL, {
      headers: {
        Authorization: sessionStorage.getItem("accessJWT"),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
  return response;
};

// get the accesstoken
export const getAccessToken = () => {
  const response = axios
    .get(`${USER_API_URL}/accessjwt`, {
      headers: {
        Authorization: localStorage.getItem("refreshJWT"),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
  return response;
};
// logout user
export const logoutUser = () => {
  const response = axios
    .post(
      USER_API_URL + "/logout",
      {},
      {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });

  return response;
};
