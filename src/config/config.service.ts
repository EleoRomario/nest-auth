import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'default_secret';
  }

  get jwtExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN || '1h';
  }
}
