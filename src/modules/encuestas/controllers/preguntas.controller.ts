import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
<<<<<<< HEAD
import { PreguntasService } from '../services/preguntas.service';
import { CreatePreguntaDto } from '../dtos/create-pregunta.dto';
=======

import { CreatePreguntaDTO } from '../dtos/create-pregunta.dto';
>>>>>>> leandro
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
<<<<<<< HEAD
    @Body() updatePreguntaDto: UpdatePreguntaDto,
  ) {
    return this.preguntasService.update(id, updatePreguntaDto);
=======
    @Body() updatePreguntaDTO: UpdatePreguntaDto,
  ) {
    return this.preguntasService.update(id, updatePreguntaDTO);
>>>>>>> leandro
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.preguntasService.remove(id);
  }
}
