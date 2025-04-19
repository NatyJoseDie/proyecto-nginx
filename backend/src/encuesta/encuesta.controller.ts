import { Controller, Get } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';

@Controller('encuesta')
export class EncuestaController {
  constructor(private readonly encuestaService: EncuestaService) {}

  @Get()
  findAll() {
    return this.encuestaService.findAll();
  }
}
