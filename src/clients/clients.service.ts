import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  async create(createClientDto: CreateClientDto): Promise<Omit<Client, 'password'>> {
    const { email, password } = createClientDto;

    createClientDto.password = bcrypt.hashSync(password, 10);

    const clientDB = await this.prisma.client.findUnique({
      where: { email }
    });

    if (clientDB) {
      throw new BadRequestException('Client already exists');
    }

    const client = this.prisma.client.create({
      data: createClientDto,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return client;
  }
}
