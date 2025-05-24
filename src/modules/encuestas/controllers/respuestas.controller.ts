import {
  Body,
  Controller,
  Post,
  Param,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRespuestaDTO } from '../dtos/create-respuesta.dto';
import { RespuestasService } from '../services/respuestas.service';

import { PreguntasService } from '../services/preguntas.service';

import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';
import { ValidateAnswerInterceptor } from 'src/interceptors/validate-answer/validate-answer.interceptor';

@Controller('/respuestas')
export class RespuestasController {
  constructor(
    private respuestasService: RespuestasService,
    private readonly preguntaService: PreguntasService,
  ) {}

  @Post(':idEncuesta/:idPregunta')
  @UseInterceptors(ValidateAnswerInterceptor)
  async responderEncuesta(
    @Param('idEncuesta', ParseIntPipe) idEncuesta: number,
    @Param('idPregunta', ParseIntPipe) idPregunta: number,
    @Body() respuesta: CreateRespuestaDTO,
  ) {
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
      const preguntaOpcion = pregunta.opciones.find(
        (el) => el.texto === respuesta.texto,
      );

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
