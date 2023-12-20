import axios from "../../config/constants";

if (localStorage.getItem("token")) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
}

export const loginAPI = async (data) => {
  try {
    const response = await axios.post("/login", data);
    const tokenData = response.data.data.tokenDTO;
    // Token을 Axios 헤더에 설정
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${tokenData.accessToken}`;

    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem("accessToken", tokenData.accessToken);
    localStorage.setItem("refreshToken", tokenData.refreshToken);

    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};
