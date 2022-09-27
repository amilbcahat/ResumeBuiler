const cons = require("consolidate");
const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const port = 3000;
// const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const jwt = require("jsonwebtoken");
const viewRouter = require("./routes/viewRoutes");

const resumeRouter = require("./routes/resumeRoutes");
const userRouter = require("./routes/userRoutes");
const compression = require("compression");

app.use(cors());

app.options("*", cors());

app.use(compression());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//1)Global Middlewares

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Rate limiter ,limits request from same Api
const limiter = rateLimit({
  max: 1000000000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP ,please try in an hour !",
});

app.use("/api", limiter);
//Body parser
app.use(express.json());
//Cookie Parser
app.use(cookieParser());
//Data sanitization against No sql query injection
app.use(mongoSanitize());
//XSS prevention'
app.use(xss());
//Helmet , sets Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
//Parameter prevention
app.use(hpp());

//Serving static files
app.use(express.static(path.join(__dirname, "/public")));

//Test Middleware
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   console.log(req.headers);
//   next();
// });

app.use(
  cookieSession({
    name: "iResume-session",
    keys: ["key1", "key2"],
  })
);

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/resumes", resumeRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
