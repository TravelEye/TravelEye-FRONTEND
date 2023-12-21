import axios from "../../config/";
export const signupAPI = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:80/signup", data);
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};
export const checkEmailAPI = async (email) => {
  try {
    const response = await axios.get(`/exists?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};
