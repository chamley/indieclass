module.exports = (sequelize, DataTypes) => {
  const StudentClass = sequelize.define('student_class', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    class_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'class',
        key: 'class_id',
      },
    },
  });

  return StudentClass;
};

