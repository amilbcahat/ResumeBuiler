const { Timestamp } = require("bson");
const { timeStamp } = require("console");
const mongoose = require("mongoose");
// const Resume = require("./../models/resumeModel");
const validator = require("validator");

const resumeSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "post must belong to a user "],
    },
    name: {
      type: String,
    },

    email: {
      type: String,
    },
    photo: {
      type: String,
    },
    phone: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    profile: {
      type: String,
    },
    about: {
      type: String,
    },
    objective: {
      type: String,
    },
    edudetails: {
      type: String,
    },
    edudetails1: {
      type: String,
    },
    edutimeperiod: {
      type: String,
    },
    edutimeperiod1: {
      type: String,
    },
    skill: {
      type: String,
    },
    achievements: {
      type: String,
    },
    project1: {
      type: String,
    },
    project2: {
      type: String,
    },
    hobbies: {
      type: String,
    },
    regards: {
      type: String,
    },
    title: {
      type: String,
    },
    designation: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },

  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
