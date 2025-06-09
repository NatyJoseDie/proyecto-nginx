import { Body, Controller, Get, Res, Post, Param, Query } from '@nestjs/common';

import { EncuestasService } from '../services/encuestas.service';
import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';

import { ObtenerEncuestaDTO } from '../dtos/obtener-encuesta.dto';
import { Encuesta } from '../entities/encuesta.entity';
import { CodigoDTO } from '../dtos/obtener-resultados-dto';
import { ResultadosDto } from '../dtos/resultados.dto';
import { Response } from 'express';
import { parse } from 'json2csv';

import { ApiTags } from '@nestjs/swagger';
@ApiTags('Encuestas')
@Controller('encuestas')
export class EncuestasController {
  constructor(private encuestasService: EncuestasService) { }

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
  @Get("paginate/:id")
  paginate() {
    return ({ ok: "paginate" })
  }
  @Get('/resultados/:id')
  async obtenerResultadosEncuesta(
    @Param('id') id: number,
    @Query() dto: CodigoDTO,
  ): Promise<ResultadosDto> {
    return await this.encuestasService.obtenerResultadosEncuesta(
      id,
      dto.codigo,
    );
  }

  @Get('/resultados/:id/csv')
  async exportarCSV(
    @Res() res: Response,
    @Param('id') id: number,
    @Query() dto: CodigoDTO,
  ) {
    const encuesta = await this.encuestasService.obtenerResultadosEncuesta(
      id,
      dto.codigo,
    );

    const preguntasMap = new Map<number, string>();
    for (const p of encuesta.preguntas) {
      preguntasMap.set(p.id, p.texto);
    }

    const filas = encuesta.respuestas.map((respuesta: any, indice: number) => {
      const fila: any = { id: indice + 1 };

      for (const r of respuesta.respuestas) {
        const textoPregunta =
          preguntasMap.get(r.preguntaId) || `Pregunta ${r.preguntaId}`;
        fila[textoPregunta] = Array.isArray(r.textoRespuesta)
          ? r.textoRespuesta.join(', ')
          : r.textoRespuesta;
      }

      return fila;
    });

    const todosLosCampos = new Set<string>();
    filas.forEach((fila) => {
      Object.keys(fila).forEach((k) => todosLosCampos.add(k));
    });

    const campos = Array.from(todosLosCampos);
    const csv = parse(filas, { fields: campos });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=encuestas.csv');
    res.send(csv);
  }
}
