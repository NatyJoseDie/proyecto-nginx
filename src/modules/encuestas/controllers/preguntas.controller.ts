import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';

import { UpdatePreguntaDto } from '../dtos/update-pregunta.dto';
import { ApiTags } from '@nestjs/swagger';
import { PreguntasService } from '../services/preguntas.service';
import { CreatePreguntaDTO } from '../dtos/create-pregunta.dto';
import { Pregunta } from '../entities/pregunta.entity';
import { Encuesta } from '../entities/encuesta.entity';

export interface PaginationResult {
  next: boolean,
  prev: boolean
  data: Encuesta

}
@ApiTags('Preguntas')
@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) { }

  @Get()
  findAll() {
    return this.preguntasService.findAll();
  }
  @Get("paginate")
  async paginatedResults(@Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number, limit = 4) {
    const paginatedResult = await this.preguntasService.executePreguntaPagination(page)
    paginatedResult.pop()
    const res = paginatedResult
    return
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
