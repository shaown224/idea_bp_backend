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

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Table({
  tableName: 'payments',
  timestamps: true,
  underscored: true,
})
export class Payment extends Model<Payment> {
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
    field: 'user_id',
  })
  userId: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(10, 2),
    field: 'amount',
  })
  amount: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'points_added',
  })
  pointsAdded: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    field: 'provider',
  })
  provider: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    field: 'status',
  })
  status: PaymentStatus;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
    field: 'transaction_id',
  })
  transactionId: string;

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
}