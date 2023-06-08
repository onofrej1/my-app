module.exports = (sequelize: any, DataTypes: any) => {
  var Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    {
      associate: function (models: any) {
        Post.belongsTo(models.Category, {
          foreignKey: "categoryId",
          as: "category",
        });
        Post.belongsToMany(models.Tag, { through: "PostTag" });
      },
    }
  );

  return Post;
};
