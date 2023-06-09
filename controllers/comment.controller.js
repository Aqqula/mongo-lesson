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

module.exports.deleteComment = async (req, res, next) => {
  try {
    const {
        params: { idComment },
      } = req;
      const deleteComment = await Comment.findByIdAndDelete(idComment);
      if (!deleteComment) {
        return next(createHTTPError(404, "Comment not found!"));
      }
      res.status(200).send({ data: deleteComment });
  } catch (error) {
    next(error);
  }
};

module.exports.updateComment = async (req, res, next) => {
  try {
    const {
      params: { idComment },
      body,
    } = req;
    const updateComment = await Comment.findByIdAndUpdate(idComment, body, {
      new: true,
      runValidators: true,
    });
    if (!updateComment) {
      return next(createHTTPError(404, "Comment not found!"));
    }
    res.status(200).send({ data: updateComment });
  } catch (error) {}
};
