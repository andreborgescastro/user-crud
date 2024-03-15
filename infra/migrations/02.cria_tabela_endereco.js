'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Endereco', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rua: Sequelize.STRING(255),
      numero: Sequelize.STRING(255),
      complemento: Sequelize.STRING(255),
      bairro: Sequelize.STRING(255),
      cidade: Sequelize.STRING(255),
      estado: Sequelize.STRING(255),
      cep: Sequelize.STRING(255),
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuario',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Endereco');
  },
};
