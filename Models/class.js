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
      type: DataTypes.DATE,
      allowNull: false,
    },
    classlength: {
      type: DataTypes.INTEGER,
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

  Class.associate = (models) => {
    Class.belongsToMany(models.student, {
      as: 'Class',
      through: 'Student_Class',
      foreignKey: 'class_id',
    });
    // Class.belongsTo(models.teacher);
    // Class.belongsTo(models.Category);
  };

  return Class;
};
