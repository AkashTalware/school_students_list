import axios from "axios";

const secureAxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/"
});

secureAxios.interceptors.response.use(
  (response) => {
    console.log("Data has been fetched");
    return response;
  },
  (error) => {
    console.log("Error while fetching the data");
    return Promise.reject(error);
  }
);

export default secureAxios;
