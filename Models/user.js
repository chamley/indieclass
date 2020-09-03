module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    user_id: {
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
    isteacher: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lastfour: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stripe_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // bio: {
    //   type: DataTypes.STRING,
    //   defaultValue:'',
    // }
  });

  User.associate = (models) => {
    User.belongsToMany(models.class, {
      as: 'student',
      through: 'student_class',
      foreignKey: 'user_id',
    });
  };

  return User;
};
