import { PassportStrategy } from '@nestjs/passport';
import { Client } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ClientsService } from 'src/clients/clients.service';
import { ConfigService } from './../../config/config.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly clientService: ClientsService,
    configService: ConfigService
  ) {
    super({
      secretOrKey: configService.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(payload: JwtPayload): Promise<Client> {
    const { email } = payload;
    const userDB = await this.clientService.findOneByEmail(email);

    if (!userDB) {
      throw new UnauthorizedException('User with this email does not exist');
    }

    if (!userDB.isActive) {
      throw new UnauthorizedException('User is not active');
    }

    return userDB;
  }
}
