import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const refresh_token = localStorage.getItem("refresh_token");

const Route = async (
  method,
  endpoint,
  token,
  data,
  id,
  contentType = "application/json"
) => {
  const headers = {
    "Content-Type": contentType,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const requestOptions = {
    method,
    headers,
  };
  // Handle JSON or FormData content types
  if (contentType === "application/json") {
    requestOptions.data = JSON.stringify(data);
  } else if (contentType === "multipart/form-data") {
    requestOptions.data = data;
  } else {
    requestOptions.data = data;
  }

  // try {
  //   if (id !== null) {
  //     const response = await axios(
  //       `${apiUrl}${endpoint}/${id}`,
  //       requestOptions
  //     );
  //     return response;
  //   } else {
  //     const response = await axios(`${apiUrl}${endpoint}`, requestOptions);
  //     return response;
  //   }
  // } catch (error) {
  //   return error;
  // }
  const makeRequest = async () => {
    try {
      if (id !== null) {
        const response = await axios(
          `${apiUrl}${endpoint}/${id}`,
          requestOptions
        );
        return response;
      } else {
        const response = await axios(`${apiUrl}${endpoint}`, requestOptions);
        return response;
      }
    } catch (error) {
      if (error?.response?.status === 403) {
        try {
          headers.Authorization = `Bearer ${refresh_token}`;
          requestOptions.headers = headers;
          requestOptions.method = "POST";
          const refreshResponse = await axios(
            `${apiUrl}/api/v1/auth/refresh-token`,
            requestOptions
          );
          if (refreshResponse?.status === 200) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.setItem(
              "access_token",
              refreshResponse?.data?.access_token
            );
            localStorage.setItem(
              "refresh_token",
              refreshResponse?.data?.refresh_token
            );
          }
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          throw refreshError;
        }
      }
      throw error;
    }
  };

  return makeRequest();
};

export default Route;
