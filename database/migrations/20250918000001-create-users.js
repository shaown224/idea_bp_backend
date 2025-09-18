'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Enable UUID extension for PostgreSQL
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: true,
      },
      profile_photo_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      points_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      phone_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      last_login_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add indexes
    await queryInterface.addIndex('users', ['email'], {
      unique: true,
      name: 'users_email_unique',
    });

    await queryInterface.addIndex('users', ['phone_number'], {
      unique: true,
      name: 'users_phone_number_unique',
      where: {
        phone_number: {
          [Sequelize.Op.ne]: null,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};