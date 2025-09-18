'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('properties', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      owner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      property_type: {
        type: Sequelize.ENUM('single_room', 'shared_room', 'sublet', 'hostel', 'family_room'),
        allowNull: true,
      },
      rent_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      location_text: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 7),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DECIMAL(10, 7),
        allowNull: true,
      },
      available_from: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    await queryInterface.addIndex('properties', ['owner_id'], {
      name: 'properties_owner_id_index',
    });

    await queryInterface.addIndex('properties', ['is_active'], {
      name: 'properties_is_active_index',
    });

    await queryInterface.addIndex('properties', ['property_type'], {
      name: 'properties_property_type_index',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('properties');
  },
};