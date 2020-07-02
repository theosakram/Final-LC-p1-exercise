'use strict';
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataBooks = JSON.parse(fs.readFileSync('./book.json', 'utf-8'))

    for (let i = 0; i < dataBooks.length; i++) {
      dataBooks[i].createdAt = new Date()
      dataBooks[i].updatedAt = new Date()
    }

    return queryInterface.bulkInsert('Books', dataBooks, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Book', null, {})
  }
};
