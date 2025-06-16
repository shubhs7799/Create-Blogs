module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
  });

  return Blog;
};
