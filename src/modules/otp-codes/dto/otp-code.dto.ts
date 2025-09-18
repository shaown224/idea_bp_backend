import { IsEmail, IsNotEmpty, IsString, IsEnum, IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OtpPurpose } from '../entities/otp-code.entity';

export class CreateOtpCodeDto {
  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', description: 'User ID (optional)', required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ example: '+1234567890', description: 'Phone number', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email address', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '123456', description: 'OTP code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'login', description: 'Purpose of the OTP', enum: OtpPurpose })
  @IsEnum(OtpPurpose)
  purpose: OtpPurpose;

  @ApiProperty({ example: '2025-09-18T18:30:00Z', description: 'Expiration time' })
  @IsNotEmpty()
  expiresAt: Date;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '+1234567890', description: 'Phone number', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email address', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '123456', description: 'OTP code to verify' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'login', description: 'Purpose of the OTP', enum: OtpPurpose })
  @IsEnum(OtpPurpose)
  purpose: OtpPurpose;
}

export class UpdateOtpCodeDto {
  @ApiProperty({ example: true, description: 'Mark OTP as used', required: false })
  @IsOptional()
  @IsBoolean()
  isUsed?: boolean;
}