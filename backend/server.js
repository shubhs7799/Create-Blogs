const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve frontend
app.use("/", require("./routes/blogRoutes"));

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
  });
});
