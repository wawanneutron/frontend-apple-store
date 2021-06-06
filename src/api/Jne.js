import axios from "axios";

const ApiJne = axios.create({
  baseURL: "https://api.binderbyte.com",
});

export default ApiJne;
