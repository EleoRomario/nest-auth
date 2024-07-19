import { Body, Controller, Post } from '@nestjs/common';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { ClientsService } from 'src/clients/clients.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: ClientsService) {}

  @Post('register')
  async register(
    @Body() createAuthDto: CreateClientDto
  ): Promise<Omit<CreateClientDto, 'password'>> {
    return this.authService.create(createAuthDto);
  }
}
