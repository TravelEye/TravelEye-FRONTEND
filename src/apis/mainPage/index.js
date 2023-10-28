import axios from "axios";
import { BASE_URL } from "../../config";
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export function loadChecklistAPI() {
  return axios
    .get("/user/checklist")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function updateChecklistAPI() {
  return axios
    .put("/user/checklist")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
export function deleteChecklistAPI() {
  return axios
    .delete("/user/checklist")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
