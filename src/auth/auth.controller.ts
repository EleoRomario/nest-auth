import { Body, Controller, Post } from '@nestjs/common';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { AuthService } from './auth.service';
import { LoginClientDto } from './dto/login-client.dto';
import { Client } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createAuthDto: CreateClientDto
  ): Promise<Omit<CreateClientDto, 'password'>> {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginClientDto): Promise<Omit<Client, 'password'>> {
    return this.authService.login(loginDto);
  }
}
