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
  if (contentType === "application/json") {
    if (data) {
      requestOptions.data = JSON.stringify(data);
    }
  } else {
    requestOptions.data = data;
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
