import axios from "../axios/axios";

export let loginUser = async (email, password) => {
  try {
    let response = await axios.post(
      "https://travelling-app.onrender.com/api/v1/auth/token",
      JSON.stringify({
        username: 'user1',
        password: 'user1'
      }),
      
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};