'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('points_transactions', {
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
      change_type: {
        type: Sequelize.ENUM('CREDIT', 'DEBIT'),
        allowNull: false,
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      previous_points: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reference_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add indexes
    await queryInterface.addIndex('points_transactions', ['user_id'], {
      name: 'points_transactions_user_id_index',
    });

    await queryInterface.addIndex('points_transactions', ['change_type'], {
      name: 'points_transactions_change_type_index',
    });

    await queryInterface.addIndex('points_transactions', ['reference_id'], {
      name: 'points_transactions_reference_id_index',
    });

    await queryInterface.addIndex('points_transactions', ['created_at'], {
      name: 'points_transactions_created_at_index',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('points_transactions');
  },
};