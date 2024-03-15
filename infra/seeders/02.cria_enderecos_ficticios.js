/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Endereco', [
      {
        rua: 'Rua A',
        numero: '123',
        complemento: 'Apartamento 101',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '12345-678',
        id_usuario: 1,
      },
      {
        rua: 'Rua B',
        numero: '456',
        complemento: 'Casa',
        bairro: 'Bairro Novo',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        cep: '54321-987',
        id_usuario: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Endereco', null, {});
  },
};
