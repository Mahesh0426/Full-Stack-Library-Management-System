export const getAuthHeader = () => {
  return {
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  };
};
