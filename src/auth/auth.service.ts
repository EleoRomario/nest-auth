import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginClientDto } from './dto/login-client.dto';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private clientService: ClientsService) {}

  async login(loginDto: LoginClientDto): Promise<Omit<Client, 'password'>> {
    const { password, email } = loginDto;

    const userDB = await this.clientService.findOneEmail(email);

    if (!userDB) {
      throw new BadRequestException('User with this email does not exist');
    }

    if (!bcrypt.compareSync(password, userDB.password)) {
      throw new BadRequestException('Invalid password');
    }

    delete userDB.password;

    return userDB;
  }
}
