import {
  Body,
  Controller,
  Post,
  Param,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateRespuestaDTO } from '../dtos/create-respuesta.dto';
import { RespuestasService } from '../services/respuestas.service';

import { PreguntasService } from '../services/preguntas.service';

import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';

@Controller('/respuestas')
export class RespuestasController {
  constructor(
    private respuestasService: RespuestasService,
    private readonly preguntaService: PreguntasService,
  ) {}

  @Post(':idEncuesta/:idPregunta')
  async responderEncuesta(
    @Param('idEncuesta', ParseIntPipe) idEncuesta: number,
    @Param('idPregunta', ParseIntPipe) idPregunta: number,
    @Body() respuesta: CreateRespuestaDTO,
  ) {
    console.log('id encuesta', idEncuesta);
    console.log('id pregunta', idPregunta);
    console.log('respuesta', respuesta);
    const pregunta = await this.preguntaService.getPreguntaByQuery(
      Number(idPregunta),
      Number(idEncuesta),
    );
    if (!pregunta) {
      throw new HttpException('Pregunta no encontrada ', HttpStatus.NOT_FOUND);
    }
    if (pregunta.tipo === TiposRespuestaEnum.ABIERTA) {
      return await this.respuestasService.createRespuestaAbierta(
        respuesta,
        idEncuesta,
      );
    }

    if (
      pregunta.tipo === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE ||
      pregunta.tipo === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE
    ) {
      console.log('in');
      const preguntaOpcion = pregunta.opciones.find(
        (el) => el.texto === respuesta.texto,
      );
      console.log('Opcion', preguntaOpcion);
      console.log(pregunta);
      if (!preguntaOpcion) {
        throw new HttpException(
          'Opcion pregunta no valida',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      return await this.respuestasService.createRespuestaCerrada(
        respuesta,
        pregunta.id,
        idEncuesta,
        preguntaOpcion,
      );
    }
  }

  // @Post(':idEncuesta')
  // async responderEncuesta(
  //   @Body() dto: CreateRespuestaDTO,
  //   @Param('idEncuesta') idEncuesta: number,
  // ): Promise<{
  //   mensaje: string;
  // }> {
  //   return await this.respuestasService.createRespuestaAbierta(dto, idEncuesta);
  // }
}
