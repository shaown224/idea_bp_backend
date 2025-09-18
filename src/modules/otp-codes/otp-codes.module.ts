import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OtpCodesService } from './otp-codes.service';
import { OtpCodesController } from './otp-codes.controller';
import { OtpCode } from './entities/otp-code.entity';

@Module({
  imports: [SequelizeModule.forFeature([OtpCode])],
  controllers: [OtpCodesController],
  providers: [OtpCodesService],
  exports: [OtpCodesService],
})
export class OtpCodesModule {}