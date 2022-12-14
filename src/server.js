import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouter";
import memberRouter from "./routers/memberRouter";
import bookRouter from "./routers/bookRouter";
import meetingRouter from "./routers/meetingRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from './middlewares';

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL
  }),
}));

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));

app.use("/", globalRouter);
app.use("/books/", bookRouter);
app.use("/members/", memberRouter);
app.use("/meetings/", meetingRouter);
app.use("/api/", apiRouter);

export default app;