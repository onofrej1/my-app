module.exports = (sequelize: any, DataTypes: any) => {
  const Tag = sequelize.define(
    "Tag",
    {
      title: DataTypes.STRING,
    },
    {
      timestamps: false,
      associate: function (models: any) {
        Tag.belongsToMany(models.Post, { through: "PostTag" });
      },
    }
  );

  return Tag;
};
