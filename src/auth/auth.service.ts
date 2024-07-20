import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginClientDto } from './dto/login-client.dto';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientsService,
    private readonly jwtService: JwtService
  ) {}

  async register(createClientDto: CreateClientDto) {
    await this.clientService.checkEmailExists(createClientDto.email);
    const user = await this.clientService.create(createClientDto);

    const token = this.getJwtToken({ email: user.email });
    return { ...user, token };
  }

  async login(loginDto: LoginClientDto) {
    const { password, email } = loginDto;

    const userDB = await this.clientService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, userDB.password)) {
      throw new UnauthorizedException('Contraseña inválida');
    }

    const { password: _, ...clientWithoutPassword } = userDB;

    const token = this.getJwtToken({ email });

    return {
      ...clientWithoutPassword,
      token
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
