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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
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
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    teacher_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Class.associate = (models) => {
    Class.belongsToMany(models.user, {
      as: 'class',
      through: 'student_class',
      foreignKey: 'class_id',
    });
  };

  return Class;
};
