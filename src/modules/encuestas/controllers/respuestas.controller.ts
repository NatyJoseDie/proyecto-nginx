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

  @Post(':idEncuesta')
  async responderEncuesta(
    @Param('idEncuesta') idEncuesta: number,
    @Body() respuesta: { texto: string; idPregunta: number },
  ) {
    console.log('respuesta', respuesta);
    const pregunta = await this.preguntaService.getPreguntaByQuery(
      Number(respuesta.idPregunta),
      Number(idEncuesta),
    );
    console.log(pregunta);
    if (!pregunta) {
      throw new HttpException('No se encontro pregunta', HttpStatus.NOT_FOUND);
    }
    if (pregunta.tipo === TiposRespuestaEnum.ABIERTA) {
      return await this.respuestasService.crearRespuesta(respuesta, idEncuesta);
    }
  }

  // @Post(':idEncuesta')
  // async responderEncuesta(
  //   @Body() dto: CreateRespuestaDTO,
  //   @Param('idEncuesta') idEncuesta: number,
  // ): Promise<{
  //   mensaje: string;
  // }> {
  //   return await this.respuestasService.crearRespuesta(dto, idEncuesta);
  // }
}
