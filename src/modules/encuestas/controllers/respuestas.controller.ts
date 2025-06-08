import { Body, Controller, Post, Param, Query } from '@nestjs/common';
import { CreateRespuestaDTO } from '../dtos/create-respuesta.dto';
import { RespuestasService } from '../services/respuestas.service';
import { CodigoDTO } from '../dtos/obtener-resultados-dto';

@Controller('/respuestas')
export class RespuestasController {
  constructor(private respuestasService: RespuestasService) {}

  @Post(':idEncuesta')
  async responderEncuesta(
    @Body() dto: CreateRespuestaDTO,
    @Param('idEncuesta') idEncuesta: number,
    @Query() codigoDto: CodigoDTO,
  ): Promise<{
    mensaje: string;
  }> {
    return await this.respuestasService.crearRespuesta(
      dto,
      idEncuesta,
      codigoDto.codigo,
    );
  }
}
