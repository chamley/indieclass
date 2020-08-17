module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teacher', {
    teacher_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
    },
  });

  Teacher.associate = (models) => {
    Teacher.hasMany(models.Class, {
      foreignKey: 'teacher_id',
      sourceKey: 'class_id',
      onDelete: 'CASCADE',
    });
  };

  return Teacher;
};
