const Comment = require("../models/Comment");

module.exports.createComand = async (req, res, next) => {
  try {
    const {
      params: { idTask },
      body,
    } = req;
    const comment = await Comment.create({ ...body, task: idTask });
    res.status(201).send({ data: comment });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate("task");
    res.status(200).send({ data: comments });
  } catch (error) {
    next(error);
  }
};
