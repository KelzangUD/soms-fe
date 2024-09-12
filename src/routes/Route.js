import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

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
  // if (contentType === "application/json") {
  //   if (data) {
  //     requestOptions.data = JSON.stringify(data);
  //   }
  // } else {
  //   requestOptions.data = data;
  // }
   // Handle JSON or FormData content types
   if (contentType === "application/json") {
    if (data) {
      requestOptions.data = JSON.stringify(data);
      headers["Content-Type"] = "application/json"; // Set Content-Type only for JSON
    }
  } else if (contentType === "multipart/form-data") {
    requestOptions.data = data; // FormData is passed directly, no need to stringify
    // Do not set Content-Type header; axios will do it automatically for FormData
  } else {
    // For any other content types
    requestOptions.data = data;
    headers["Content-Type"] = contentType;
  }

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
    return error;
  }
};

export default Route;
