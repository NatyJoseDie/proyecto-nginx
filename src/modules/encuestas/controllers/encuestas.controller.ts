import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { EncuestasService } from '../services/encuestas.service';
import { CreateEncuestaDto } from '../dtos/create-encuesta.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Encuestas')
@Controller('/encuestas')
export class EncuestasController {
  constructor(private readonly encuestasService: EncuestasService) {}

  @Get()
  findAll() {
    return this.encuestasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.encuestasService.findOne(id);
  }

  @Post()
  create(@Body() createEncuestaDto: CreateEncuestaDto) {
    return this.encuestasService.create(createEncuestaDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.encuestasService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.encuestasService.remove(id);
  }
}
