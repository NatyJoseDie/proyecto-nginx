<<<<<<< HEAD
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
=======
import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';

>>>>>>> 9c179d70759e456d011e0f70babb6dfb28922e2a
import { EncuestasService } from '../services/encuestas.service';
import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';

import { ObtenerEncuestaDTO } from '../dtos/obtener-encuesta.dto';
import { Encuesta } from '../entities/encuesta.entity';
import { ObtenerResultadosEncuestaDTO } from '../dtos/obtener-resultados-dto';
import { ResultadosDto } from '../dtos/resultados.dto';

@Controller('/encuestas')
export class EncuestasController {
  constructor(private encuestasService: EncuestasService) {}

  @Post()
  async crearEncuesta(@Body() dto: CreateEncuestaDTO): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    return await this.encuestasService.crearEncuesta(dto);
  }

  @Get(':id')
  async obtenerEncuesta(
    @Param('id') id: number,
    @Query() dto: ObtenerEncuestaDTO,
  ): Promise<Encuesta> {
    return await this.encuestasService.obtenerEncuesta(
      id,
      dto.codigo,
      dto.tipo,
    );
  }

<<<<<<< HEAD
  @Post()
  create(@Body() createEncuestaDto: CreateEncuestaDto) {
    return this.encuestasService.create(createEncuestaDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.encuestasService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.encuestasService.remove(id);
=======
  @Get('/resultados/:id')
  async obtenerResultadosEncuesta(
    @Param('id') id: number,
    @Query() dto: ObtenerResultadosEncuestaDTO,
  ): Promise<ResultadosDto> {
    return await this.encuestasService.obtenerResultadosEncuesta(
      id,
      dto.codigo,
    );
>>>>>>> 9c179d70759e456d011e0f70babb6dfb28922e2a
  }
}
