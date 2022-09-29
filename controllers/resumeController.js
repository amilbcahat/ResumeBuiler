const Resume = require("./../models/resumeModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const sharp = require("sharp");
const multer = require("multer");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `${req.body.name}-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.file.filename}`);
  next();
});

exports.createResume = catchAsync(async (req, res, next) => {
  if (!req.body.created_by || req.body.created_by) {
    req.body.created_by = req.user.id;
  }
  if (req.file) {
    req.body.photo = req.file.filename;
  }

  console.log(req.file);

  // console.log(req.body);
  const resume = await Resume.create(req.body);

  res.status(201).json({
    status: "success",
    data: { data: resume },
  });
});

exports.deleteResume = catchAsync(async (req, res, next) => {
  const resume = await Resume.findByIdAndDelete(req.params.resumeId);

  if (!resume) {
    return next(new AppError("No doc found with that ID", 404));
  }

  if (resume.created_by != req.user.id) {
    return next(new AppError("Current User cant access this resource", 403));
  }

  res.status(200).json({
    status: "success",
    data: { data: null },
  });
});

exports.getAResume = catchAsync(async (req, res, next) => {
  const resume = await Resume.findById(req.params.resumeId);

  if (resume.created_by == req.user.id) {
  } else {
    return next(new AppError("Current User cant access this resource", 403));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: resume,
    },
  });
});

exports.updateResume = catchAsync(async (req, res, next) => {
  console.log("request");
  console.log(req.body);
  const resume = await Resume.findById(req.params.resumeId);

  if (!resume) {
    return next(new AppError("No doc found with that ID", 404));
  }

  if (resume.created_by != req.user.id) {
    return next(new AppError("Current User cant access this resource", 403));
  } else {
    var Uresume = await Resume.findByIdAndUpdate(
      req.params.resumeId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.status(200).json({
    status: "success",
    data: { data: Uresume },
  });
});

exports.getCurrentUserResumes = catchAsync(async (req, res, next) => {
  const resumes = await Resume.find({ created_by: req.user.id });

  res.status(200).json({
    status: "success",
    data: {
      data: resumes,
    },
  });
});
