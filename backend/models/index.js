const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Add this line
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Blog = require("./blog")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

// Associations
db.Blog.hasMany(db.Comment, { onDelete: 'CASCADE' });
db.Comment.belongsTo(db.Blog);

module.exports = db;