import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from './config/config.module';
@Module({
  imports: [AuthModule, ClientsModule, PrismaModule, ConfigModule],
  controllers: [],
  providers: []
})
export class AppModule {}
