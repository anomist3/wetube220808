import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import memberRouter from "./routers/memberRouter.js";
import bookRouter from "./routers/bookRouter.js";
import meetingRouter from "./routers/meetingRouter.js";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/books/", bookRouter);
app.use("/members/", memberRouter);
app.use("/meetings/", meetingRouter);

export default app;