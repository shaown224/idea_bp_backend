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
import { Property } from '../../properties/entities/property.entity';

@Table({
  tableName: 'property_images',
  timestamps: true,
  underscored: true,
})
export class PropertyImage extends Model<PropertyImage> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    field: 'id',
  })
  id: string;

  @AllowNull(false)
  @ForeignKey(() => Property)
  @Column({
    type: DataType.UUID,
    field: 'property_id',
  })
  propertyId: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
    field: 'file_url',
  })
  fileUrl: string;

  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_primary',
  })
  isPrimary: boolean;

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
  @BelongsTo(() => Property, { foreignKey: 'propertyId', as: 'property' })
  property: Property;
}