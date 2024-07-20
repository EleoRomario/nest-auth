import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
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

  async checkEmailExists(email: string): Promise<void> {
    const clientDB = await this.prisma.client.findUnique({
      where: { email }
    });

    if (clientDB) {
      throw new BadRequestException('El cliente con este correo electrónico ya existe');
    }
  }

  async findOneByEmail(email: string): Promise<Client> {
    try {
      const clientDB = await this.prisma.client.findUnique({
        where: { email }
      });

      if (!clientDB) {
        throw new NotFoundException('Correo electrónico no encontrado');
      }

      return clientDB;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          message: 'Error al buscar un cliente',
          error: error.message
        });
      }
    }
  }

  async create(createClientDto: CreateClientDto): Promise<Omit<Client, 'password'>> {
    const { email, password } = createClientDto;

    await this.checkEmailExists(email); // Verificar si el email ya existe

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el cliente con la contraseña hasheada
    const client = await this.prisma.client.create({
      data: {
        ...createClientDto,
        password: hashedPassword
      },
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
