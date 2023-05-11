const createHTTPError = require("http-errors");
const Task = require("../models/Task");
const Comment = require("../models/Comment");

module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const task = await Task.create(body);
    if (!task) {
      return next(createHTTPError(400, "Bad request!"));
    }
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllTasks = async (req, res, next) => {
  try {
    // const tasks = await Task.find({});
    const tasks = await Comment.populate(await Comment.find({}), {
      path: "task",
    });
    if (tasks.length === 0) {
      return next(createHTTPError(404, "Tasks not found!"));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
      body,
    } = req;
    const updateTask = await Task.findByIdAndUpdate(idTask, body, {
      new: true,
      runValidators: true,
    });
    if (!updateTask) {
      return next(createHTTPError(404, "Task not found!"));
    }
    res.status(200).send({ data: updateTask });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const deleteTask = await Task.findByIdAndDelete(idTask);
    if (!deleteTask) {
      return next(createHTTPError(404, "Task not found!"));
    }
    res.status(200).send({ data: deleteTask });
  } catch (error) {
    next(error);
  }
};

module.exports.findTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    // const task = await Task.findById(idTask);
    const task = await Comment.populate(await Comment.find({ task: idTask }), {
      path: "task",
    });
    if (!task) {
      return next(createHTTPError(404, "Task not found!"));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
