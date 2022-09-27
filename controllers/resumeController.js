const Resume = require("./../models/resumeModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.createResume = catchAsync(async (req, res, next) => {
  if (!req.body.created_by || req.body.created_by) {
    req.body.created_by = req.user.id;
  }
  console.log(req.body);
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
