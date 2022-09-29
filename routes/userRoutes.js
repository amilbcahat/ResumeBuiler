const express = require("express");
const resumeController = require("./../controllers/resumeController");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);

router.use(authController.protect);
router.route("/me").get(userController.getCurrentUser);
router.route("/resumes").get(resumeController.getCurrentUserResumes);
router
  .route("/updateMe")
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
  );

module.exports = router;
