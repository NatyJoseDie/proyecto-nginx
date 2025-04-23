import { Controller, Post, Get, Body } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { Pregunta } from '../entities/pregunta.entity';

@Controller('pregunta')
export class PreguntaController {
  constructor(private readonly preguntaService: PreguntaService) {}

  @Post()
  async create(
    @Body() createPreguntaDto: CreatePreguntaDto,
  ): Promise<Pregunta> {
    return this.preguntaService.create(createPreguntaDto);
  }

  @Get()
  async findAll(): Promise<Pregunta[]> {
    return this.preguntaService.findAll();
  }
}
