import express from "express";
const { registerViews, addComment } = require('../controllers/bookController');

const apiRouter = express.Router();

apiRouter.post("/books/:id/views", registerViews);
apiRouter.post("/books/:id/add-comment", addComment);

export default apiRouter;