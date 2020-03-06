module.exports = (sequelize, DataTypes) => {
  const Enderecos = sequelize.define('Enderecos', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cep: DataTypes.STRING,
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    bairro: DataTypes.STRING,
    estado: DataTypes.STRING,
  });

  Enderecos.associate = (models) => {
    Enderecos.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Enderecos;
};
