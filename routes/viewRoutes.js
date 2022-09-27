const express = require("express");
const resumeController = require("./../controllers/resumeController");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const viewController = require("./../controllers/viewController");

const router = express.Router();
// router.use(authController.protect);

router
  .route("/user/resume1/:resumeId")
  .get(viewController.getRenderedTemplate1);
router
  .route("/user/resume2/:resumeId")
  .get(viewController.getRenderedTemplate2);
router
  .route("/user/resume1/:resumeId/generatePDF")
  .get(viewController.generatePdf);

router.route("/login").get(viewController.getLogin);
router.route("/signup").get(viewController.getSignup);
router.route("/createResume").get(viewController.createResume);
router
  .route("/dashboard")
  .get(authController.isLoggedIn, viewController.getdashboard);

router.route("/editResume/:resumeId").get(viewController.editResume);
module.exports = router;
