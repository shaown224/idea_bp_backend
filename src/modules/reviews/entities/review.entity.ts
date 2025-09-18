import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';

@Table({
  tableName: 'reviews',
  timestamps: true,
  underscored: true,
})
export class Review extends Model<Review> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    field: 'id',
  })
  id: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'reviewer_id',
  })
  reviewerId: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'reviewee_id',
  })
  revieweeId: string;

  @AllowNull(true)
  @ForeignKey(() => Property)
  @Column({
    type: DataType.UUID,
    field: 'property_id',
  })
  propertyId: string;

  @AllowNull(true)
  @Column({
    type: DataType.SMALLINT,
    field: 'rating',
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating: number;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    field: 'comment',
  })
  comment: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updatedAt: Date;

  // Associations
  @BelongsTo(() => User, { foreignKey: 'reviewerId', as: 'reviewer' })
  reviewer: User;

  @BelongsTo(() => User, { foreignKey: 'revieweeId', as: 'reviewee' })
  reviewee: User;

  @BelongsTo(() => Property, { foreignKey: 'propertyId', as: 'property' })
  property: Property;
}