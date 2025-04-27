import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PreguntasService } from '../services/preguntas.service';
import { CreatePreguntaDto } from '../dtos/create-pregunta.dto';
import { UpdatePreguntaDto } from '../dtos/update-pregunta.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Preguntas')
@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Get()
  findAll() {
    return this.preguntasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.preguntasService.findOne(id);
  }

  @Post()
  create(@Body() createPreguntaDto: CreatePreguntaDto) {
    return this.preguntasService.create(createPreguntaDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePreguntaDto: UpdatePreguntaDto) {
    return this.preguntasService.update(id, updatePreguntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.preguntasService.remove(id);
  }
}
