'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      reviewer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      reviewee_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      property_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'properties',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      rating: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex('reviews', ['reviewer_id'], {
      name: 'reviews_reviewer_id_index',
    });

    await queryInterface.addIndex('reviews', ['reviewee_id'], {
      name: 'reviews_reviewee_id_index',
    });

    await queryInterface.addIndex('reviews', ['property_id'], {
      name: 'reviews_property_id_index',
    });

    await queryInterface.addIndex('reviews', ['rating'], {
      name: 'reviews_rating_index',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  },
};