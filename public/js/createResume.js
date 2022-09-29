import axios from "axios";
import { showAlert } from "./alerts";

export const createResume = async (data) => {
  console.log(data);
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/resumes",
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", "Your Resume has been created successfully");
      window.setTimeout(() => {
        console.log(res);
        window.location.replace(`/user/resume1/${res.data.data.data.id}`);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    // console.log(err.response.data.message);
  }
};
