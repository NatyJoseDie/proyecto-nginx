import { Injectable } from '@nestjs/common';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';

export interface Encuesta {
  id: number;
  nombre: string;
  codigoRespuesta: string;
  codigoResultados: string;
}

@Injectable()
export class EncuestaService {
  private encuestas: Encuesta[] = [];

  create(createEncuestaDto: CreateEncuestaDto) {
    const nuevaEncuesta: Encuesta = {
      id: this.encuestas.length + 1,
      ...createEncuestaDto,
      codigoRespuesta: Math.random().toString(36).substring(7),
      codigoResultados: Math.random().toString(36).substring(7),
    };
    this.encuestas.push(nuevaEncuesta);
    return nuevaEncuesta;
  }

  findAll(): Encuesta[] {
    return this.encuestas;
  }
}
