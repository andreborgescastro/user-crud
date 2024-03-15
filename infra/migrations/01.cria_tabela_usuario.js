'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuario', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      cpf: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      nome: { type: Sequelize.STRING(255), allowNull: false },
      data_nascimento: { type: Sequelize.DATE, allowNull: false },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      criado_em: { type: Sequelize.DATE, allowNull: false },
      usuario_criacao: { type: Sequelize.STRING(255), allowNull: false },
      removido_em: { type: Sequelize.DATE },
      usuario_remocao: { type: Sequelize.STRING(255) },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuario');
  },
};
