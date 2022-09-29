const express = require("express");
const resumeController = require("./../controllers/resumeController");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(
    resumeController.uploadUserPhoto,
    resumeController.resizeUserPhoto,
    resumeController.createResume
  );
router
  .route("/:resumeId")
  .delete(resumeController.deleteResume)
  .get(resumeController.getAResume)
  .post(resumeController.updateResume);

// router.route("/all").get(resumeController.getCurrentUserResumes);

module.exports = router;
