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
// const authRouter = require("./routes/authRoutes");
const viewRouter = require("./routes/viewRoutes");
// const postRouter = require("./routes/postRoutes");
// const commentRouter = require("./routes/commentRoutes");
// const categoryRouter = require("./routes/categoryRoutes");
const resumeRouter = require("./routes/resumeRoutes");
const userRouter = require("./routes/userRoutes");
// app.use(expressLayouts);
// const authController = require("./controllers/authController");
// require("./utils/auth");

// app.set("view engine", "html");
//RENDERS HTML FILES UNDER views folder
// app.engine("html", cons.swig);
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

// 3)ROUTES
// app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

// app.use("/api/v1/users", userRouter);
// app.use(cors());

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(
  cookieSession({
    name: "acad-session",
    keys: ["key1", "key2"],
  })
);

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewRouter);

// app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/posts", postRouter);
// app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/resumes", resumeRouter);
// app.all("*", (req, res, next) => {
//   next(new AppError(`Cant find ${req.originalUrl} on this server`));
// });

// app.use(globalErrorHandler);

module.exports = app;
