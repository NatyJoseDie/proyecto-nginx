import { Body, Controller, Post, Param } from '@nestjs/common';
import { CreateRespuestaDTO } from '../dtos/create-respuesta.dto';
import { RespuestasService } from '../services/respuestas.service';

@Controller('/respuestas')
export class RespuestasController {
  constructor(private respuestasService: RespuestasService) {}

  @Post(':idEncuesta')
  async responderEncuesta(
    @Body() dto: CreateRespuestaDTO,
    @Param('idEncuesta') idEncuesta: number,
  ): Promise<{
    mensaje: string;
  }> {
    return await this.respuestasService.crearRespuesta(dto, idEncuesta);
  }
}
