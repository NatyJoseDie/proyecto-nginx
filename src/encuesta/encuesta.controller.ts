import { Controller, Get, Post, Body } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';

@Controller('encuesta')
export class EncuestaController {
  constructor(private readonly encuestaService: EncuestaService) {}

  @Get()
  findAll() {
    return this.encuestaService.findAll();
  }

  @Post('respuesta')
  createRespuesta(@Body() data: { encuestaId: number }) {
    return this.encuestaService.createRespuesta(data.encuestaId);
  }
}
