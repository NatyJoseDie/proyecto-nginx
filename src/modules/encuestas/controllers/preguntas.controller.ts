import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PreguntasService } from '../services/preguntas.service';
import { CreatePreguntaDTO } from '../dtos/create-pregunta.dto';
import { UpdatePreguntaDto } from '../dtos/update-pregunta.dto';

@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Get()
  findAll() {
    return this.preguntasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.preguntasService.findOne(id);
  }

  @Post()
  create(@Body() createPreguntaDTO: CreatePreguntaDTO) {
    return this.preguntasService.create(createPreguntaDTO);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePreguntaDTO: UpdatePreguntaDto,
  ) {
    return this.preguntasService.update(id, updatePreguntaDTO);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.preguntasService.remove(id);
  }
}
