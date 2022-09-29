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
        location.assign(`/dashboard`);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const editResume = async (
  id,
  name,
  email,
  objective,
  achievements,
  edudetails,
  edudetails1,
  edutimeperiod1,
  edutimeperiod,
  skill,
  hobbies,
  phone,
  about,
  location,
  project1,
  project2,
  photo,
  designation,
  linkedin
) => {
  // console.log(data.get(name));
  try {
    const res = await axios({
      method: "POST",
      config: { headers: { "Content-Type": "multipart/form-data" } },
      url: `/api/v1/resumes/${id}`,
      data: {
        id,
        name,
        email,
        objective,
        achievements,
        edudetails,
        edudetails1,
        edutimeperiod1,
        edutimeperiod,
        skill,
        hobbies,
        phone,
        about,
        location,
        project1,
        project2,
        photo,
        designation,
        linkedin,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Your Resume has been updated successfully");
      window.setTimeout(() => {
        window.location.href = `/user/resume1/${id}`;
      }, 1500);
    }
  } catch (err) {
    // showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
  }
};
