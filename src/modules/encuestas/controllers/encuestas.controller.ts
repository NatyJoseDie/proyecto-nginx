import { Body, Controller, Get, Res, Post, Param, Query } from '@nestjs/common';

import { EncuestasService } from '../services/encuestas.service';
import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';

import { ObtenerEncuestaDTO } from '../dtos/obtener-encuesta.dto';
import { Encuesta } from '../entities/encuesta.entity';
import { CodigoDTO } from '../dtos/obtener-resultados-dto';
import { ResultadosDto } from '../dtos/resultados.dto';
import { Response } from 'express';
import { parse } from 'json2csv';
import { PaginationResult } from '../interfaces/paginationResult'; // Import PaginationResult

import { ApiTags } from '@nestjs/swagger';
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

  @Get('/resultados/:id')
  async obtenerResultadosEncuesta(
    @Param('id') id: number,
    @Query() dto: CodigoDTO,
    @Query('page') page: number = 1, // Add page query parameter, default to 1
    @Query('limit') limit: number = 5, // Add limit query parameter, default to 5 (or your preferred default)
  ): Promise<PaginationResult<ResultadosDto>> { // Update return type
    return await this.encuestasService.obtenerResultadosEncuesta(
      id,
      dto.codigo,
      page, // Pass page
      limit, // Pass limit
    );
  }

  @Get('/resultados/:id/csv')
  async exportarCSV(
    @Res() res: Response,
    @Param('id') id: number,
    @Query() dto: CodigoDTO,
    // Assuming CSV export should fetch all results, not paginated
    // If paginated CSV is needed, add page/limit here too
  ) {
    // For CSV, we might want all data, so call a different service method or fetch all pages.
    // For simplicity, let's assume we fetch the first page for now, or you adjust the service method.
    // Ideally, you'd have a separate service method for exporting all results if that's the requirement.
    const paginatedResultados = await this.encuestasService.obtenerResultadosEncuesta(
      id,
      dto.codigo,
      1, // Default to page 1 for CSV or fetch all
      0, // A limit of 0 or a very high number could signify 'all' in your service
    );

    const encuestaResultados = paginatedResultados.data; // Access the data from the paginated result

    const preguntasMap = new Map<number, string>();
    if (encuestaResultados && encuestaResultados.preguntas) {
      for (const p of encuestaResultados.preguntas) {
        preguntasMap.set(p.id, p.texto);
      }
    }

    let filas: any[] = []; // Especificamos el tipo explícitamente como any[]
    if (encuestaResultados && encuestaResultados.respuestas) {
      filas = encuestaResultados.respuestas.map((respuesta: any, indice: number) => {
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
    }

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
