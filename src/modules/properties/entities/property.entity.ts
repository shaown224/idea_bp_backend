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
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { PropertyImage } from '../../property-images/entities/property-image.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Review } from '../../reviews/entities/review.entity';

export enum PropertyType {
  SINGLE_ROOM = 'single_room',
  SHARED_ROOM = 'shared_room',
  SUBLET = 'sublet',
  HOSTEL = 'hostel',
  FAMILY_ROOM = 'family_room',
}

@Table({
  tableName: 'properties',
  timestamps: true,
  underscored: true,
})
export class Property extends Model<Property> {
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
    field: 'owner_id',
  })
  ownerId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(200),
    field: 'title',
  })
  title: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    field: 'description',
  })
  description: string;

  @AllowNull(true)
  @Column({
    type: DataType.ENUM(...Object.values(PropertyType)),
    field: 'property_type',
  })
  propertyType: PropertyType;

  @AllowNull(true)
  @Column({
    type: DataType.DECIMAL(10, 2),
    field: 'rent_amount',
  })
  rentAmount: number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(255),
    field: 'location_text',
  })
  locationText: string;

  @AllowNull(true)
  @Column({
    type: DataType.DECIMAL(10, 7),
    field: 'latitude',
  })
  latitude: number;

  @AllowNull(true)
  @Column({
    type: DataType.DECIMAL(10, 7),
    field: 'longitude',
  })
  longitude: number;

  @AllowNull(true)
  @Column({
    type: DataType.DATEONLY,
    field: 'available_from',
  })
  availableFrom: Date;

  @AllowNull(false)
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
  })
  isActive: boolean;

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
  @BelongsTo(() => User, { foreignKey: 'ownerId', as: 'owner' })
  owner: User;

  @HasMany(() => PropertyImage, { foreignKey: 'propertyId', as: 'images' })
  images: PropertyImage[];

  @HasMany(() => Contact, { foreignKey: 'propertyId', as: 'contacts' })
  contacts: Contact[];

  @HasMany(() => Review, { foreignKey: 'propertyId', as: 'reviews' })
  reviews: Review[];
}