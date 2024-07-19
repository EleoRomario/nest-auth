import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsService } from 'src/clients/clients.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ClientsService, PrismaService]
})
export class AuthModule {}
