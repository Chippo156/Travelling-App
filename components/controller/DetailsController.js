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
export let getImagesDestination = async (id) => {
  try {
    const response = await axios.get(`/destination-images/destination/${id}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export let getImageRoom = async (id) => {
  try {
    const response = await axios.get(`/room-images/room/${id}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export let getAmenities = async (id) => {
  try {
    const response = await axios.get(`/destination-amenity/destination/${id}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export let getRoomsByDestinationId = async (id) => {
  try {
    const response = await axios.get(`/rooms/destination/${id}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export let getRoomById = async (id) => {
  try {
    const response = await axios.get(`/rooms/${id}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getFullAmenities = async () => {
  try {
    const response = await axios.get(`/amenities`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
