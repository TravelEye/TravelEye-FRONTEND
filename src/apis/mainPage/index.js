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
export function addChecklistAPI(title) {
  return axios
    .post("/user/checklist", { title })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
export function updateChecklistAPI(id, title, completed) {
  return axios
    .put("/user/checklist", { id, title, completed })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function deleteChecklistAPI(id) {
  return axios
    .delete(`/user/checklist/${id}`) // Assuming the endpoint expects the ID as a part of the URL
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
