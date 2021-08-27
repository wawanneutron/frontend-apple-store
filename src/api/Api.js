import axios from "axios";

const Api = axios.create({
  // set default endpoint API
  baseURL: "http://localhost:8000/api",
  // baseURL: "https://adminsport.my.id/api",
});

export default Api;
