import axios from "axios";
import { showAlert } from "./alerts";

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "/api/v1/users/updateMyPassword"
        : "/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} Updated Successfully`);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const deleteResume = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/v1/resumes/${id}`,
    });

    if (res.data.data.data === null) {
      showAlert("success", "Your Resume has been deleted successfully");
      window.setTimeout(() => {
        location.assign(`/createResume`);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const editResume = async (
  name,
  email,
  objective,
  achievements,
  phone,
  about,
  edudetails,
  skill,
  project,
  hobbies,
  regards,
  id
) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `/api/v1/resumes/${id}`,
      data: {
        name,
        email,
        objective,
        achievements,
        phone,
        about,
        edudetails,
        skill,
        project,
        hobbies,
        regards,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Your Resume has been updated successfully");
      window.setTimeout(() => {
        location.assign(`/user/resume1/${id}`);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
