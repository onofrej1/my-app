const { Sequelize } = require("sequelize");

export const sequelize = new Sequelize("myapp", "test", "test", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

sequelize.sync({ force: true });
