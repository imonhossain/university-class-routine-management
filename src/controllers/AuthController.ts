import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '@/dto/SignInDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { AuthService } from '@/services/AuthService';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'User sign-in and token generation' })
  @ApiResponse({ status: 201, description: 'The user has been successfully signed-in' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signIn(@Body() signInDto: SignInDto): Promise<SignInUserDto> {
    return this.authService.signIn(signInDto);
  }
}
