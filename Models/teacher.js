module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teacher', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    talent_field: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Teacher;
};
