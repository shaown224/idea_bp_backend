'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('property_images', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      property_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'properties',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      file_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      is_primary: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.addIndex('property_images', ['property_id'], {
      name: 'property_images_property_id_index',
    });

    await queryInterface.addIndex('property_images', ['is_primary'], {
      name: 'property_images_is_primary_index',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('property_images');
  },
};