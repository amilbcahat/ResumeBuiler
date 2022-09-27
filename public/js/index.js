import "@babel/polyfill";
import { login, logout } from "./login";
import { signup } from "./signup";
import { createResume } from "./createResume";
import { deleteResume, editResume } from "./updateResume";

const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const resumeForm = document.querySelector(".form--resume");
const btnDelete = document.querySelector(".btn--delete");
const btnEdit = document.querySelector(".btn--edit");

if (loginForm) {
  document.querySelector(".form--login").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // console.log('button clicked');
    login(email, password);
  });
}

if (signupForm) {
  document.querySelector(".btn-signup").addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    // console.log('button clicked');
    signup(name, email, password, passwordConfirm);
  });
}

if (resumeForm) {
  document.querySelector(".form--resume").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;
    const objective = document.getElementById("objective").value;
    const phone = document.getElementById("phone").value;
    const about = document.getElementById("about").value;
    const edudetails = document.getElementById("edudetails").value;
    const achievements = document.getElementById("achievements").value;
    const regards = document.getElementById("regards").value;

    const skill = document.getElementById("skill").value;
    const project = document.getElementById("project").value;
    const hobbies = document.getElementById("regards").value;

    // console.log('button clicked');
    createResume(
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
    );
  });
}

if (btnDelete) {
  document.querySelector(".btn--delete").addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.querySelector(".right").dataset.id;

    deleteResume(id);
  });
}

if (btnEdit) {
  document.querySelector(".btn--edit").addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector(".right").dataset.id;
    // location.assign(`/editResume/${id}`);
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const objective = document.getElementById("objective").value;
    const phone = document.getElementById("phone").value;
    const about = document.getElementById("about").value;
    const edudetails = document.getElementById("edudetails").value;
    const achievements = document.getElementById("achievements").value;
    const regards = document.getElementById("regards").value;
    const skill = document.getElementById("skill").value;
    const project = document.getElementById("project").value;
    const hobbies = document.getElementById("regards").value;
    editResume(
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
    );
  });
}
