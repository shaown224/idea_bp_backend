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
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

export enum ChangeType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

@Table({
  tableName: 'points_transactions',
  timestamps: false,
  underscored: true,
})
export class PointsTransaction extends Model<PointsTransaction> {
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
    type: DataType.ENUM(...Object.values(ChangeType)),
    field: 'change_type',
  })
  changeType: ChangeType;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'points',
    validate: {
      min: 1, // positive integer only
    },
  })
  points: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'previous_points',
  })
  previousPoints: number;

  @AllowNull(true)
  @Column({
    type: DataType.UUID,
    field: 'reference_id',
  })
  referenceId: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;

  // Associations
  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  user: User;
}