import { Controller, Post, Body, Get } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';

@Controller('encuestas')
export class EncuestaController {
  constructor(private readonly encuestaService: EncuestaService) {}

  @Post()
  create(@Body() createEncuestaDto: CreateEncuestaDto) {
    return this.encuestaService.create(createEncuestaDto);
  }

  @Get()
  findAll() {
    return this.encuestaService.findAll();
  }
}
