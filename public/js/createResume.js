import axios from "axios";
import { showAlert } from "./alerts";

export const createResume = async (
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
  regards
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/resumes",
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
      showAlert("success", "Your Resume has been created successfully");
      window.setTimeout(() => {
        location.assign(`/user/resume1/${res.data.data.data.id}`);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
