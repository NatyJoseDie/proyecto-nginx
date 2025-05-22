import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { EncuestasService } from '../services/encuestas.service';
import { CreateEncuestaDto } from '../dtos/create-encuesta.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Encuestas')
@Controller('encuestas')
export class EncuestasController {
  constructor(private readonly encuestasService: EncuestasService) {}

  @Get()
  findAll() {
    return this.encuestasService.findAll();
  }

  @Get('responder/:codigo')
  obtenerEncuestaParaResponder(@Param('codigo') codigo: string) {
    return this.encuestasService.obtenerPorCodigoRespuesta(codigo);
  }

  @Get('resultados/:codigo')
  obtenerResultados(@Param('codigo') codigo: string) {
    return this.encuestasService.obtenerPorCodigoResultados(codigo);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.encuestasService.findOne(id);
  }

  @Post()
  create(@Body() createEncuestaDto: CreateEncuestaDto) {
    return this.encuestasService.create(createEncuestaDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.encuestasService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.encuestasService.remove(id);
  }
}
