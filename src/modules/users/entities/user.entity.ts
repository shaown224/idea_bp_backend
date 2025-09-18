import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  Unique,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Property } from '../../properties/entities/property.entity';
import { PointsTransaction } from '../../points-transactions/entities/points-transaction.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { OtpCode } from '../../otp-codes/entities/otp-code.entity';

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    field: 'id',
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(150),
    field: 'full_name',
  })
  fullName: string;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING(150),
    field: 'email',
  })
  email: string;

  @AllowNull(true)
  @Unique
  @Column({
    type: DataType.STRING(30),
    field: 'phone_number',
  })
  phoneNumber: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    field: 'profile_photo_url',
  })
  profilePhotoUrl: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
    field: 'bio',
  })
  bio: string;

  @AllowNull(false)
  @Default(5)
  @Column({
    type: DataType.INTEGER,
    field: 'points_balance',
  })
  pointsBalance: number;

  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    field: 'phone_verified',
  })
  phoneVerified: boolean;

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
    field: 'last_login_at',
  })
  lastLoginAt: Date;

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
  @HasMany(() => Property, { foreignKey: 'ownerId', as: 'properties' })
  properties: Property[];

  @HasMany(() => PointsTransaction, { foreignKey: 'userId', as: 'pointsTransactions' })
  pointsTransactions: PointsTransaction[];

  @HasMany(() => Contact, { foreignKey: 'requesterId', as: 'contactRequests' })
  contactRequests: Contact[];

  @HasMany(() => Contact, { foreignKey: 'landlordId', as: 'contactsReceived' })
  contactsReceived: Contact[];

  @HasMany(() => Review, { foreignKey: 'reviewerId', as: 'reviewsGiven' })
  reviewsGiven: Review[];

  @HasMany(() => Review, { foreignKey: 'revieweeId', as: 'reviewsReceived' })
  reviewsReceived: Review[];

  @HasMany(() => Payment, { foreignKey: 'userId', as: 'payments' })
  payments: Payment[];

  @HasMany(() => OtpCode, { foreignKey: 'userId', as: 'otpCodes' })
  otpCodes: OtpCode[];

  // Convert to JSON
  toJSON() {
    const values = Object.assign({}, this.get() as any);
    return values;
  }
}