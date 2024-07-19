import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from '@prisma/client';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }
}
