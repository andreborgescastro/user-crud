/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuario', [
      {
        cpf: '12345678901',
        nome: 'João Silva',
        data_nascimento: '1990-01-01',
        status: true,
        criado_em: new Date(),
        usuario_criacao: 'admin',
        removido_em: null,
        usuario_remocao: null,
      },
      {
        cpf: '98765432109',
        nome: 'Maria Santos',
        data_nascimento: '1995-05-15',
        status: true,
        criado_em: new Date(),
        usuario_criacao: 'admin',
        removido_em: null,
        usuario_remocao: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuario', null, {});
  },
};
