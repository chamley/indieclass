module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
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

  category.associate = (models) => {
    category.hasMany(models.class, {
      foreignKey: 'category_id',
      onDelete: 'CASCADE',
    });
  };

  return category;
};
