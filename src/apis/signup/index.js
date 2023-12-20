import axios from "../../config/";
export const signupAPI = async (data) => {
  try {
    const response = await axios.post("/signup", data);
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};
