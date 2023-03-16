const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// Create a new instance of Sequelize with your database credentials
const sequelize = new Sequelize(
  process.env.SEQUELIZE_DATABASE,
  process.env.SEQUELIZE_USERNAME,
  process.env.SEQUELIZE_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    dialect: "mysql",
  }
);

const User = sequelize.define(
  "user",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

const Job = sequelize.define(
  "job",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    underscored: true,
  }
);

User.hasMany(Job);
Job.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Job,
};
