'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('otp_codes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      phone_number: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      purpose: {
        type: Sequelize.ENUM('login', 'registration', 'password_reset', 'verify_phone', 'verify_email'),
        allowNull: false,
      },
      is_used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
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

    // Add indexes for better performance
    await queryInterface.addIndex('otp_codes', ['user_id']);
    await queryInterface.addIndex('otp_codes', ['phone_number']);
    await queryInterface.addIndex('otp_codes', ['email']);
    await queryInterface.addIndex('otp_codes', ['code']);
    await queryInterface.addIndex('otp_codes', ['purpose']);
    await queryInterface.addIndex('otp_codes', ['is_used']);
    await queryInterface.addIndex('otp_codes', ['expires_at']);
    
    // Composite indexes for common queries
    await queryInterface.addIndex('otp_codes', ['phone_number', 'purpose', 'is_used']);
    await queryInterface.addIndex('otp_codes', ['email', 'purpose', 'is_used']);
    await queryInterface.addIndex('otp_codes', ['code', 'purpose', 'is_used', 'expires_at']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('otp_codes');
  },
};