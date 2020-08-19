module.exports = (sequelize, DataTypes) => {
  const StudentClass = sequelize.define('student_class', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    class_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'class',
        key: 'class_id',
      },
    },
  });

  /*   StudentClass.associate = (models) => {
    StudentClass.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'student',
    });
    StudentClass.belongsTo(models.class, {
      foreignKey: 'class_id',
      as: 'class',
    }); */
  //   };
  return StudentClass;
};
