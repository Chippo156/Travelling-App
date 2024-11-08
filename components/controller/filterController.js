import axios from "../axios/axios";

export const getFilterDestination = async (city) => {
  try {
    if (city === "Other") {
      const res = await axios(
        `https://travelling-app.onrender.com/api/v1/destinations`
      );
      return res;
    }
    const res = await axios(
      `https://travelling-app.onrender.com/api/v1/destinations/filter?location=${city}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
