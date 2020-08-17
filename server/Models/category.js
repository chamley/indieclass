module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Class, { onDelete: 'CASCADE' });
  };

  return Category;
};
