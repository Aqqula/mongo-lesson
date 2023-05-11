const express = require("express");
const TaskController = require("./controllers/task.controller");
const CommentController = require("./controllers/comment.controller");
const { errorHandle } = require("./middlewares/error.handle.mv");

const app = express();

app.use(express.json());

app.get("/tasks", TaskController.findAllTasks);
app.get("/tasks/:idTask", TaskController.findTask);
app.delete("/tasks/:idTask", TaskController.deleteTask);
app.put("/tasks/:idTask", TaskController.updateTask);
app.post("/tasks", TaskController.createTask);

app.post("/tasks/:idTask/comments", CommentController.createComand);
app.put("/comments/:idComment", CommentController.updateComment);
app.delete("/comments/:idComment", CommentController.deleteComment);
app.get("/comments", CommentController.findAllComments);

app.use(errorHandle);

module.exports = app;
