import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import memberRouter from "./routers/memberRouter.js";
import bookRouter from "./routers/bookRouter.js";
import meetingRouter from "./routers/meetingRouter.js";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.use(logger);
app.set("views", process.cwd() + "/src/views");
app.use("/", globalRouter);
app.use("/books", bookRouter);
app.use("/members", memberRouter);
app.use("/meetings", meetingRouter);

const handleListening = () => console.log(`Server listening on port: ${PORT}`);
app.listen(4000, handleListening);