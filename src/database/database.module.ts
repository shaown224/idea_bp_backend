import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database.config';
import { User } from '../modules/users/entities/user.entity';
import { Property } from '../modules/properties/entities/property.entity';
import { PropertyImage } from '../modules/property-images/entities/property-image.entity';
import { PointsTransaction } from '../modules/points-transactions/entities/points-transaction.entity';
import { Contact } from '../modules/contacts/entities/contact.entity';
import { Review } from '../modules/reviews/entities/review.entity';
import { Payment } from '../modules/payments/entities/payment.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...databaseConfig(configService),
        models: [
          User,
          Property,
          PropertyImage,
          PointsTransaction,
          Contact,
          Review,
          Payment,
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}