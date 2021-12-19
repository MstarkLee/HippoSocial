import axios from "axios";

// Create an instance of axios
const Api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
