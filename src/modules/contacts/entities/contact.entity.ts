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
  tableName: 'contacts',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['requester_id', 'property_id'],
      name: 'contacts_requester_property_unique',
    },
  ],
})
export class Contact extends Model<Contact> {
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
    field: 'requester_id',
  })
  requesterId: string;

  @AllowNull(false)
  @ForeignKey(() => Property)
  @Column({
    type: DataType.UUID,
    field: 'property_id',
  })
  propertyId: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'landlord_id',
  })
  landlordId: string;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
    field: 'unlocked_at',
  })
  unlockedAt: Date;

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
  @BelongsTo(() => User, { foreignKey: 'requesterId', as: 'requester' })
  requester: User;

  @BelongsTo(() => Property, { foreignKey: 'propertyId', as: 'property' })
  property: Property;

  @BelongsTo(() => User, { foreignKey: 'landlordId', as: 'landlord' })
  landlord: User;
}