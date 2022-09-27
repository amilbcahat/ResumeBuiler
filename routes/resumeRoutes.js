const express = require("express");
const resumeController = require("./../controllers/resumeController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router.route("/").post(resumeController.createResume);
router
  .route("/:resumeId")
  .delete(resumeController.deleteResume)
  .get(resumeController.getAResume)
  .patch(resumeController.updateResume);

// router.route("/all").get(resumeController.getCurrentUserResumes);

module.exports = router;
