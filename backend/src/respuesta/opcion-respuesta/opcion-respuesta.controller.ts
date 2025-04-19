import { Controller, Post, Get, Body } from '@nestjs/common';
import { OpcionRespuestaService } from './opcion-respuesta.service';
import { CreateOpcionRespuestaDto } from './dto/create-opcion-respuesta.dto';

@Controller('opcion-respuesta')
export class OpcionRespuestaController {
  constructor(private readonly opcionRespuestaService: OpcionRespuestaService) {}

  @Post()
  create(@Body() createOpcionRespuestaDto: CreateOpcionRespuestaDto) {
    return this.opcionRespuestaService.createRespuesta(createOpcionRespuestaDto);
  }

  @Get()
  findAll() {
    return this.opcionRespuestaService.findAll();
  }
}