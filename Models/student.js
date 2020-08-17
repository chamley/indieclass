module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('student', {
    student_id: {
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
  });

  Student.associate = (models) => {
    Student.belongsToMany(models.class, {
      as: 'Student',
      through: 'Student_Class',
      foreignKey: 'student_id',
    });
  };

  return Student;
};
