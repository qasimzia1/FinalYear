import axios from "axios";

const getSymptoms = async () => {
  const response = await axios
    .get("http://localhost:8000/api/getSymptoms")
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log("hi");
        console.log(error.response.data);
        console.log("error.response :", error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return error.message;
      }
    });
  return response;
};

export default getSymptoms;
