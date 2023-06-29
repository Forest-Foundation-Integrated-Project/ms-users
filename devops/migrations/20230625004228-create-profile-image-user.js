'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'profileImage', {
      allowNull: true,
      type: Sequelize.STRING,
      unique: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColoumn('users', 'profileImage');
  }
};
