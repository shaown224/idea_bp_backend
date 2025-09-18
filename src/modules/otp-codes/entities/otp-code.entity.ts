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

export enum OtpPurpose {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  PASSWORD_RESET = 'password_reset',
  VERIFY_PHONE = 'verify_phone',
  VERIFY_EMAIL = 'verify_email',
}

@Table({
  tableName: 'otp_codes',
  timestamps: true,
  underscored: true,
})
export class OtpCode extends Model<OtpCode> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    field: 'id',
  })
  id: string;

  @AllowNull(true)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'user_id',
    onDelete: 'SET NULL',
  })
  userId: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(30),
    field: 'phone_number',
  })
  phoneNumber: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(150),
    field: 'email',
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(10),
    field: 'code',
  })
  code: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(OtpPurpose)),
    field: 'purpose',
  })
  purpose: OtpPurpose;

  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_used',
  })
  isUsed: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    field: 'expires_at',
  })
  expiresAt: Date;

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
  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  user: User;

  // Helper methods
  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  isValid(): boolean {
    return !this.isUsed && !this.isExpired();
  }

  // Convert to JSON
  toJSON() {
    const values = Object.assign({}, this.get() as any);
    return values;
  }
}