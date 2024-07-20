import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginClientDto } from './dto/login-client.dto';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';

@Injectable()
export class AuthService {
  constructor(private clientService: ClientsService) {}

  async register(createClientDto: CreateClientDto): Promise<Omit<Client, 'password'>> {
    // Verificar si el correo electrónico ya está registrado
    await this.clientService.checkEmailExists(createClientDto.email);

    // Delegar la creación del cliente al servicio de clientes
    const user = await this.clientService.create(createClientDto);

    return user;
  }

  async login(loginDto: LoginClientDto): Promise<Omit<Client, 'password'>> {
    const { password, email } = loginDto;

    const userDB = await this.clientService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, userDB.password)) {
      throw new UnauthorizedException('Contraseña inválida');
    }

    const { password: _, ...clientWithoutPassword } = userDB;

    return clientWithoutPassword;
  }
}
