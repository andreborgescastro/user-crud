'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuario', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cpf: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      nome: Sequelize.STRING(255),
      data_nascimento: Sequelize.DATE,
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      criado_em: Sequelize.DATE,
      usuario_criacao: Sequelize.STRING(255),
      removido_em: Sequelize.DATE,
      usuario_remocao: Sequelize.STRING(255),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuario');
  },
};
