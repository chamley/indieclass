import { Student } from './student';

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    class_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    classname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classtime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classlength: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    signedup: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  Class.hasMany(Student, {
    foreignKey: 'student_id',
    sourceKey: 'class_id',
    onDelete: 'CASCADE',
  });

  return Class;
};
