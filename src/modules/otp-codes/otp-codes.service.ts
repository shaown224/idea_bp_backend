import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { OtpCode, OtpPurpose } from './entities/otp-code.entity';
import { CreateOtpCodeDto, VerifyOtpDto, UpdateOtpCodeDto } from './dto/otp-code.dto';

@Injectable()
export class OtpCodesService {
  constructor(
    @InjectModel(OtpCode)
    private otpCodeModel: typeof OtpCode,
  ) {}

  async create(createOtpCodeDto: CreateOtpCodeDto): Promise<OtpCode> {
    // Invalidate existing unused OTPs for the same purpose and contact method
    const whereClause: any = {
      purpose: createOtpCodeDto.purpose,
      isUsed: false,
    };

    if (createOtpCodeDto.phoneNumber) {
      whereClause.phoneNumber = createOtpCodeDto.phoneNumber;
    }
    if (createOtpCodeDto.email) {
      whereClause.email = createOtpCodeDto.email;
    }
    if (createOtpCodeDto.userId) {
      whereClause.userId = createOtpCodeDto.userId;
    }

    await this.otpCodeModel.update(
      { isUsed: true },
      { where: whereClause }
    );

    const otpCode = await this.otpCodeModel.create(createOtpCodeDto);
    return otpCode;
  }

  async findAll(): Promise<OtpCode[]> {
    return this.otpCodeModel.findAll({
      order: [['createdAt', 'DESC']],
      include: ['user'],
    });
  }

  async findOne(id: string): Promise<OtpCode> {
    const otpCode = await this.otpCodeModel.findByPk(id, {
      include: ['user'],
    });
    if (!otpCode) {
      throw new NotFoundException('OTP code not found');
    }
    return otpCode;
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{ success: boolean; otpCode?: OtpCode }> {
    const whereClause: any = {
      code: verifyOtpDto.code,
      purpose: verifyOtpDto.purpose,
      isUsed: false,
      expiresAt: {
        [Op.gt]: new Date(),
      },
    };

    if (verifyOtpDto.phoneNumber) {
      whereClause.phoneNumber = verifyOtpDto.phoneNumber;
    }
    if (verifyOtpDto.email) {
      whereClause.email = verifyOtpDto.email;
    }

    const otpCode = await this.otpCodeModel.findOne({
      where: whereClause,
      include: ['user'],
    });

    if (!otpCode) {
      return { success: false };
    }

    // Mark as used
    await otpCode.update({ isUsed: true });

    return { success: true, otpCode };
  }

  async update(id: string, updateOtpCodeDto: UpdateOtpCodeDto): Promise<OtpCode> {
    const otpCode = await this.findOne(id);
    await otpCode.update(updateOtpCodeDto);
    return otpCode;
  }

  async remove(id: string): Promise<void> {
    const otpCode = await this.findOne(id);
    await otpCode.destroy();
  }

  async cleanupExpired(): Promise<number> {
    const result = await this.otpCodeModel.destroy({
      where: {
        expiresAt: {
          [Op.lt]: new Date(),
        },
      },
    });
    return result;
  }

  async generateOtp(
    purpose: OtpPurpose,
    options: {
      userId?: string;
      phoneNumber?: string;
      email?: string;
      expirationMinutes?: number;
    }
  ): Promise<OtpCode> {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + (options.expirationMinutes || 10));

    const createOtpDto: CreateOtpCodeDto = {
      userId: options.userId,
      phoneNumber: options.phoneNumber,
      email: options.email,
      code,
      purpose,
      expiresAt,
    };

    return this.create(createOtpDto);
  }
}