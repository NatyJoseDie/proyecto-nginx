import {
  Body,
  Controller,
  Get,
  Res,
  Post,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
  UsePipes,
  Patch,
} from '@nestjs/common';

import { EncuestasService } from '../services/encuestas.service';
import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';

import { ObtenerEncuestaDTO } from '../dtos/obtener-encuesta.dto';
import { Encuesta } from '../entities/encuesta.entity';
import { CodigoDTO } from '../dtos/obtener-resultados-dto';
import { ResultadosDto } from '../dtos/resultados.dto';
import { Response } from 'express';
import { parse } from 'json2csv';

import { ApiTags } from '@nestjs/swagger';
import { PaginationResult } from '../interfaces/paginationResult';
import { CodigoDTODecorator } from '../decorators/codigoDto';
import { ResultadosGraficosDto } from '../dtos/resultados.graficos.dto';
@ApiTags('Encuestas')
@Controller('encuestas')
export class EncuestasController {
  constructor(private encuestasService: EncuestasService) {}

  @Get()
  async obtenerTodasLasEncuestas(): Promise<Encuesta[]> {
    return await this.encuestasService.obtenerTodas();
  }

  @Post()
  async crearEncuesta(@Body() dto: CreateEncuestaDTO): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    return await this.encuestasService.crearEncuesta(dto);
  }

  @Patch(':id/estado')
  async cambiarEstadoEncuesta(
    @Param('id') id: number,
    @Query() dto: CodigoDTO,
    @Body('activa') activa: boolean,
  ): Promise<{
    mensaje: string;
  }> {
    return await this.encuestasService.cambiarEstadoEncuesta(
      id,
      dto.codigo,
      activa,
    );
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

  @Get('/resultados/:id/csv')
  async exportarCSV(
    @Res() res: Response,
    @Param('id') id: number,
    @Query() dto: CodigoDTO,
  ) {
    const encuesta = await this.encuestasService.obtenerResultadosEncuestaCSV(
      id,
      dto.codigo,
    );

    const preguntasMap = new Map<number, string>();
    for (const pregunta of encuesta.preguntas) {
      preguntasMap.set(pregunta.id, pregunta.texto);
    }

    const registros = encuesta.respuestas.map(
      (respuesta: any, indice: number) => {
        const registro: any = { id: indice + 1 };

        for (const res of respuesta.respuestas) {
          const textoDePregunta =
            preguntasMap.get(res.preguntaId) || `Pregunta ${res.preguntaId}`;
          registro[textoDePregunta] = Array.isArray(res.textoRespuesta)
            ? res.textoRespuesta.join(', ')
            : res.textoRespuesta;
        }
        return registro;
      },
    );

    const todosLosCampos = new Set<string>();
    registros.forEach((fila) => {
      Object.keys(fila).forEach((k) => todosLosCampos.add(k));
    });

    const campos = Array.from(todosLosCampos);
    const csv = parse(registros, { fields: campos });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=encuestas.csv');
    res.send(csv);
  }

  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: false }))
  @Get('/resultados/:id/graficos')
  async obtenerResultadosGraficosEncuesta(
    @Param('id') id: number,
    @CodigoDTODecorator(new ValidationPipe({ transform: true }))
    { codigo }: CodigoDTO,
  ): Promise<ResultadosGraficosDto> {
    return await this.encuestasService.obtenerResultadosGraficoEncuesta(
      id,
      codigo,
    );
  }

  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: false }))
  @Get('/resultados/:id')
  async obtenerResultadosEncuesta(
    @Param('id') id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @CodigoDTODecorator(new ValidationPipe({ transform: true }))
    { codigo }: CodigoDTO,
  ): Promise<PaginationResult<ResultadosDto>> {
    return await this.encuestasService.obtenerResultadosEncuesta(
      id,
      codigo,
      page,
      4,
    );
  }
}
