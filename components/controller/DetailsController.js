import axios from "../axios/axios";

export let getDestinationById = async (id) => {
  try {
    const response = await axios.get(`/destinations/${id}`);

    return response.data.result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export let getImagesDestination = async (id) => {};
