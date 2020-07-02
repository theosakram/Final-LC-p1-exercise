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
    let dataAuthor = JSON.parse(fs.readFileSync('./author.json', 'utf-8'))

    for (let i = 0; i < dataAuthor.length; i++) {
      dataAuthor[i].createdAt = new Date()
      dataAuthor[i].updatedAt = new Date()
    }

    return queryInterface.bulkInsert('Authors', dataAuthor, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Authors', null, {})
  }
};
