const jobs = require("./routes/jobs");
const express = require("express");
const app = express();
const { sequelize } = require("./database");

const startServer = async () => {
  try {
    app.use(express.json());
    app.use("/api/jobs", jobs);

    await sequelize.authenticate();
    await sequelize.sync();

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log("Unable to connect to db... ", error);
  }
};

startServer();
