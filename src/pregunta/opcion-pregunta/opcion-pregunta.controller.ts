import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opcion } from '../../entities/opcion.entity';
import { Pregunta } from '../../entities/pregunta.entity';
import { Controller, Post, Get, Body } from '@nestjs/common';
import { OpcionPreguntaService } from './opcion-pregunta.service';
import { CreateOpcionDto } from './dto/create-opcion.dto';

@Controller('opcion-pregunta')
export class OpcionPreguntaController {
  constructor(private readonly opcionPreguntaService: OpcionPreguntaService) {}

  @Post()
  create(@Body() createOpcionDto: CreateOpcionDto) {
    return this.opcionPreguntaService.createOpcionPregunta(createOpcionDto);
  }

  @Get()
  findAll() {
    return this.opcionPreguntaService.findAll();
  }
}
