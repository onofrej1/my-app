module.exports = (sequelize: any, DataTypes: any) => {
  var Category = sequelize.define(
    "Category",
    {
      title: DataTypes.STRING,
    },
    {
      timestamps: false,
      associate: function (models: any) {
        Category.hasMany(models.Post, {
          foreignKey: "categoryId",
          as: "category",
        });
      },
    }
  );

  return Category;
};
