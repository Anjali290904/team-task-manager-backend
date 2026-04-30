import axios from "axios";

const API = axios.create({
  baseURL: "https://railway.com/project/6f8096c7-06a3-4e5d-91d8-9b1546bee72e/service/5ba86ac4-32c1-4844-80c2-eec703407c0e?environmentId=01af2795-e56f-42b7-9fde-c53dd3a0630a&id=0f65b517-734c-480d-b690-f7f471903c4d#deploy", // backend URL
});

// Attach token automatically if user logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;