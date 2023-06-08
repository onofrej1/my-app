"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db: any = {};

const sequelize: any = new Sequelize("myapp", "test", "test", {
  host: "localhost",
  dialect: "mysql",
});

const models = path.join(process.cwd(), "models");

fs.readdirSync(models)
  .filter((file: any) => {
    console.log(file);
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.ts") === -1
    );
  })
  .forEach((file: any) => {
    if (file !== "index.ts") {
      const model = require("models/" + file)(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].hasOwnProperty("associate")) {
    db[modelName].associate(db);
  }
});

//sequelize.sync({ alter: true });

module.exports = db;
