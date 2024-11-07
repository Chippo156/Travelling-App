import axios from "../axios/axios";

export let loginUser = async (email, password) => {
  try {
    const response = await axios.post("/auth/token", {
      username: email,
      password: password,
    });

    
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
