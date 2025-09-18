import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { OtpCodesService } from './otp-codes.service';
import { CreateOtpCodeDto, VerifyOtpDto, UpdateOtpCodeDto } from './dto/otp-code.dto';

@ApiTags('OTP Codes')
@Controller('otp-codes')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT-auth')
export class OtpCodesController {
  constructor(private readonly otpCodesService: OtpCodesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new OTP code' })
  @ApiResponse({ status: 201, description: 'OTP code created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createOtpCodeDto: CreateOtpCodeDto) {
    return this.otpCodesService.create(createOtpCodeDto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify an OTP code' })
  @ApiResponse({ status: 200, description: 'OTP verification result' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or expired' })
  verify(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.otpCodesService.verifyOtp(verifyOtpDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all OTP codes' })
  @ApiResponse({ status: 200, description: 'OTP codes retrieved successfully' })
  // @UseGuards(RolesGuard)
  // @Roles('admin')
  findAll() {
    return this.otpCodesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get OTP code by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'OTP code UUID' })
  @ApiResponse({ status: 200, description: 'OTP code retrieved successfully' })
  @ApiResponse({ status: 404, description: 'OTP code not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.otpCodesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update OTP code' })
  @ApiParam({ name: 'id', type: 'string', description: 'OTP code UUID' })
  @ApiResponse({ status: 200, description: 'OTP code updated successfully' })
  @ApiResponse({ status: 404, description: 'OTP code not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOtpCodeDto: UpdateOtpCodeDto,
  ) {
    return this.otpCodesService.update(id, updateOtpCodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete OTP code' })
  @ApiParam({ name: 'id', type: 'string', description: 'OTP code UUID' })
  @ApiResponse({ status: 200, description: 'OTP code deleted successfully' })
  @ApiResponse({ status: 404, description: 'OTP code not found' })
  // @UseGuards(RolesGuard)
  // @Roles('admin')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.otpCodesService.remove(id);
  }

  @Delete('cleanup/expired')
  @ApiOperation({ summary: 'Clean up expired OTP codes' })
  @ApiResponse({ status: 200, description: 'Expired OTP codes cleaned up successfully' })
  // @UseGuards(RolesGuard)
  // @Roles('admin')
  cleanupExpired() {
    return this.otpCodesService.cleanupExpired();
  }
}