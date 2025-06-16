const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/blogs", async (req, res) => {
  const blogs = await db.Blog.findAll({ include: db.Comment, order: [['createdAt', 'DESC']] });
  res.json(blogs);
});

router.post("/blogs", async (req, res) => {
  const { title, author, content } = req.body;
  const blog = await db.Blog.create({ title, author, content });
  res.json(blog);
});

router.post("/blogs/:id/comments", async (req, res) => {
  const blog = await db.Blog.findByPk(req.params.id);
  if (!blog) return res.status(404).send("Blog not found");
  const comment = await blog.createComment({ content: req.body.content });
  res.json(comment);
});

router.delete("/blogs/:blogId/comments/:commentId", async (req, res) => {
  const comment = await db.Comment.findOne({
    where: {
      id: req.params.commentId,
      BlogId: req.params.blogId,
    },
  });
  if (!comment) return res.status(404).send("Comment not found");
  await comment.destroy();
  res.sendStatus(204);
});

module.exports = router;
