import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { CreatePreguntaDTO } from '../dtos/create-pregunta.dto';

import { UpdatePreguntaDto } from '../dtos/update-pregunta.dto';
import { ApiTags } from '@nestjs/swagger';
import { PreguntasService } from '../services/preguntas.service';

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
  create(@Body() createPreguntaDTO: CreatePreguntaDTO) {
    return this.preguntasService.create(createPreguntaDTO);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,

    @Body() updatePreguntaDTO: UpdatePreguntaDto,
  ) {
    return this.preguntasService.update(id, updatePreguntaDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.preguntasService.remove(id);
  }
}
