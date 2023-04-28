'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
    await queryInterface.removeColumn('users', 'enroll',{});
    await queryInterface.removeColumn('users', 'username',{});
    await queryInterface.addColumn('users', 'gender',{
      type: Sequelize.ENUM('man', 'woman', 'other'),
      allowNull: false
    });
    await queryInterface.addColumn('users', 'email',{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
    await queryInterface.addColumn('users', 'phone',{
      type: Sequelize.STRING,
      unique: true
    });
    await queryInterface.addColumn('users', 'city',{
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('users', 'university',{
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('users', 'user_bio',{
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('users', 'contact_info',{
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('users', 'role',{
      type: Sequelize.ENUM('default', 'active'),
      allowNull: false,
      defaultValue: 'default'
    });
    await queryInterface.addColumn('users', 'active',{
      type: Sequelize.BOOLEAN,
      allowNull: false
    });
  }catch (error) {
    console.log(error)
  }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};

// Para rodar as migrations novamente, derrube o banco e o crie novamente.