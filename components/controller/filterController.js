import axios from "../axios/axios";

export const getFilterDestination = async (city) => {
  try {
    if (city === "Other") {
      const res = await axios(
        `/destinations?page=1&size=10`
      );
      return res;
    }
    const res = await axios(
      `destinations/location?location=${city}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getImageDestination = async (id) => {
  try {
    const res = await axios(
      `destination-images/destination/${id}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}
