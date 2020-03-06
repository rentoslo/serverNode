module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      // validate: {
      //   isNumeric: true,
      // },
    },
  }, {
    defaultScope: {
      // attributes: { exclude: ['password'] },
    },
  });

  users.associate = (models) => {
    users.hasMany(models.Enderecos, {
      foreignKey: 'userId',
      as: 'enderecos',
    });
  };

  return users;
};
