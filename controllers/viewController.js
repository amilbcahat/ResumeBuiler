const Resume = require("../models/resumeModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const fs = require("fs");
// const pdf = require("pdf-creator-node");
const path = require("path");
// const options = require("./../helpers/options");
// const data = require("./../helpers/data");
const QRCode = require("qrcode");
const pdf = require("html-pdf");
const ejs = require("ejs");
exports.getRenderedTemplate1 = catchAsync(async (req, res, next) => {
  const resume = await Resume.findById(req.params.resumeId);

  QRCode.toDataURL(
    `${req.protocol}://${req.get("host")}/${req.originalUrl}`,
    function (err, url) {
      // console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
      res.status(200).render("resume1.ejs", {
        title: "Your Resume",
        resume: resume,
        qr: url,
      });
    }
  );
});

exports.getRenderedTemplate2 = catchAsync(async (req, res, next) => {
  const resume = await Resume.findById(req.params.resumeId);

  QRCode.toDataURL(
    `${req.protocol}://${req.get("host")}/${req.originalUrl}`,
    function (err, url) {
      // console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
      res.status(200).render("restemplate2.ejs", {
        title: "Your Resume",
        resume: resume,
        qr: url,
      });
    }
  );
});

exports.generatePdf = catchAsync(async (req, res, next) => {
  const resume = await Resume.findById(req.params.resumeId);

  const filename =
    resume.name.split(" ").join("") +
    "-" +
    resume.created_by +
    "-" +
    Date.now();

  req.body.filename = filename;

  ejs.renderFile(
    `${__dirname}/../views/resume1.ejs`,
    { resume: resume },
    (err, data) => {
      if (err) {
        console.log("error 1");
        res.send(err.message);
      } else {
        let options = {
          height: "11.25in",
          width: "8.5in",
          header: {
            height: "20mm",
          },
          footer: {
            height: "20mm",
          },
        };
        pdf
          .create(data, options)
          .toFile(`resumePDFs/${filename}.pdf`, function (err, data) {
            if (err) {
              console.log("error 2");
              res.send(err);
            } else {
              res.download(
                `${__dirname}/../resumePDFs/${req.body.filename}.pdf`
              );
            }
          });
      }
    }
  );
  // next();
});

exports.getLogin = catchAsync(async (req, res, next) => {
  // const resume = await Resume.findById(req.params.resumeId);

  res.status(200).render("login1.ejs", {
    title: "Login Page",
  });
});

exports.getSignup = catchAsync(async (req, res, next) => {
  // const resume = await Resume.findById(req.params.resumeId);

  res.status(200).render("signup1.ejs", {
    title: "Signup Page",
  });
});

exports.createResume = catchAsync(async (req, res, next) => {
  // const resume = await Resume.findById(req.params.resumeId);

  res.status(200).render("createResume.ejs", {
    title: "Create Your resume",
  });
});

exports.editResume = catchAsync(async (req, res, next) => {
  const resume = await Resume.findById(req.params.resumeId);

  res.status(200).render("editResume1.ejs", {
    title: "Edit Your resume",
    resume: resume,
  });
});

exports.deleteResume = catchAsync(async (req, res, next) => {
  const resume = await Resume.findById(req.params.resumeId);

  res.status(200).render("deleteResume.ejs", {
    title: "Edit Your resume",
    resume: resume,
  });
});

exports.getdashboard = catchAsync(async (req, res, next) => {
  // console.log(req.user.id);
  const resumes = await Resume.find({ created_by: req.user.id });

  QRCode.toDataURL(
    `${req.protocol}://${req.get("host")}/user/resume1/<%-resume.id%>`,
    function (err, url) {
      // console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
      res.status(200).render("dashboard.ejs", {
        title: "Your Dashboard",
        resumes: resumes,
        qr: url,
      });
    }
  );
});

exports.getResumeQR = catchAsync(async (req, res, next) => {
  const resume = await Resume.findById(req.params.resumeId);
  const link = `${req.protocol}://${req.get("host")}/user/resume1/${
    req.params.resumeId
  }`;
  QRCode.toDataURL(
    `${req.protocol}://${req.get("host")}/user/resume1/${req.params.resumeId}`,
    function (err, url) {
      // console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
      res.status(200).render("qrcode.ejs", {
        title: "Your QRcode",
        resume: resume,
        qr: url,
        link,
      });
    }
  );
});
