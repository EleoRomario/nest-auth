import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client } from '@prisma/client';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { email } = createClientDto;

    const client = await this.prisma.client.findUnique({
      where: { email }
    });

    if (client) {
      throw new BadRequestException('Client already exists');
    }

    return this.prisma.client.create({ data: createClientDto });
  }
}
