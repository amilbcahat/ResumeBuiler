import "@babel/polyfill";
import axios from "axios";

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
    const project1 = document.getElementById("project1").value;
    const project2 = document.getElementById("project2").value;
    const edudetails1 = document.getElementById("edudetails1").value;
    const edutimeperiod1 = document.getElementById("edutimeperiod1").value;
    const edutimeperiod = document.getElementById("edutimeperiod").value;
    const linkedin = document.getElementById("linkedin").value;
    const skill = document.getElementById("skill").value;
    const hobbies = document.getElementById("hobbies").value;
    const designation = document.getElementById("designation").value;
    const location = document.getElementById("location").value;
    const photo = document.getElementById("photo").files[0];
    // console.log(photo);

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("objective", objective);
    form.append("phone", phone);
    form.append("about", about);
    form.append("edudetails", edudetails);
    form.append("achievements", achievements);
    form.append("project1", project1);
    form.append("project2", project2);
    form.append("edudetails1", edudetails1);
    form.append("edutimeperiod1", edutimeperiod1);
    form.append("edutimeperiod", edutimeperiod);
    form.append("linkedin", linkedin);
    form.append("skill", skill);
    form.append("hobbies", hobbies);
    form.append("designation", designation);
    form.append("location", location);
    form.append("photo", photo);
    // console.log(form.get(name));
    createResume(form, "data");
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
  document.querySelector(".btn--edit").addEventListener("click", async (e) => {
    e.preventDefault();
    const id = document.querySelector(".right").dataset.id;
    // console.log(id);
    // location.assign(`/editResume/${id}`);
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const objective = document.getElementById("objective").value;
    const phone = document.getElementById("phone").value;
    const about = document.getElementById("about").value;
    const edudetails = document.getElementById("edudetails").value;
    const achievements = document.getElementById("achievements").value;
    const project1 = document.getElementById("project1").value;
    const project2 = document.getElementById("project2").value;
    const edudetails1 = document.getElementById("edudetails1").value;
    const edutimeperiod1 = document.getElementById("edutimeperiod1").value;
    const edutimeperiod = document.getElementById("edutimeperiod").value;
    const linkedin = document.getElementById("linkedin").value;
    const skill = document.getElementById("skill").value;
    const hobbies = document.getElementById("hobbies").value;
    const designation = document.getElementById("designation").value;
    const location = document.getElementById("location").value;
    const photo = document.getElementById("photo").files[0];

    console.log(hobbies);
    // const form = new FormData();
    // form.append("name", name);
    // form.append("email", email);
    // form.append("objective", objective);
    // form.append("phone", phone);
    // form.append("about", about);
    // form.append("edudetails", edudetails);
    // form.append("achievements", achievements);
    // form.append("project1", project1);
    // form.append("project2", project2);
    // form.append("edudetails1", edudetails1);
    // form.append("edutimeperiod1", edutimeperiod1);
    // form.append("edutimeperiod", edutimeperiod);
    // form.append("linkedin", linkedin);
    // form.append("skill", skill);
    // form.append("hobbies", hobbies);
    // form.append("designation", designation);
    // form.append("location", location);
    // form.append("photo", photo);
    console.log(hobbies);
    // console.log(form.get(hobbies));
    editResume(
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
    );
  });
}
