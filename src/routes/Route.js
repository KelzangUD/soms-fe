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
   // Handle JSON or FormData content types
   if (contentType === "application/json") {
    requestOptions.data = JSON.stringify(data);
    headers["Content-Type"] = "application/json"; 
  } else if (contentType === "multipart/form-data") {
    requestOptions.data = data;
  } else {
    requestOptions.data = data;
    // headers["Content-Type"] = contentType;
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
