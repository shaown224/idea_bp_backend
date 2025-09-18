import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsPhoneNumber, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+1234567890', description: 'User phone number', required: false })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg', description: 'Profile photo URL', required: false })
  @IsOptional()
  @IsString()
  profilePhotoUrl?: string;

  @ApiProperty({ example: 'Software developer with 5 years of experience', description: 'User bio', required: false })
  @IsOptional()
  @IsString()
  bio?: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'User email address', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name', required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ example: '+1234567890', description: 'User phone number', required: false })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg', description: 'Profile photo URL', required: false })
  @IsOptional()
  @IsString()
  profilePhotoUrl?: string;

  @ApiProperty({ example: 'Software developer with 5 years of experience', description: 'User bio', required: false })
  @IsOptional()
  @IsString()
  bio?: string;
}