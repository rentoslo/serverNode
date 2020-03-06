module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      primaryKey: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      // validate: {
      //   isNumeric: true,
      // },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('Users'),
};
