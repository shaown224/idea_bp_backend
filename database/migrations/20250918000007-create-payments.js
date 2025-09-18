'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      points_added: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      provider: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'success', 'failed'),
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.STRING(100),
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

    // Add indexes
    await queryInterface.addIndex('payments', ['user_id'], {
      name: 'payments_user_id_index',
    });

    await queryInterface.addIndex('payments', ['status'], {
      name: 'payments_status_index',
    });

    await queryInterface.addIndex('payments', ['transaction_id'], {
      unique: true,
      name: 'payments_transaction_id_unique',
    });

    await queryInterface.addIndex('payments', ['provider'], {
      name: 'payments_provider_index',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  },
};