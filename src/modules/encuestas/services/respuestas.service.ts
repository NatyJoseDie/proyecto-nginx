// import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Encuesta } from '../entities/encuesta.entity';
// import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
// import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';
// import { v4 } from 'uuid';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { RespuestaAbierta } from '../entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../entities/respuesta-opcion.entity';
import { RespuestaVerdaderoFalso } from '../entities/respuesta-verdadero-falso.entity';
import { Repository } from 'typeorm';
import { CreateRespuestaDTO } from '../dtos/create-respuesta.dto';
import { Encuesta } from '../entities/encuesta.entity';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
    @InjectRepository(Encuesta)
    private encuestasRepository: Repository<Encuesta>,

    @InjectRepository(RespuestaAbierta)
    private respuestaAbiertaRepository: Repository<RespuestaAbierta>,

    @InjectRepository(RespuestaOpcion)
    private respuestaOpcionRepository: Repository<RespuestaOpcion>,

    @InjectRepository(RespuestaVerdaderoFalso)
    private respuestaVFRepository: Repository<RespuestaVerdaderoFalso>,
  ) {}

  async crearRespuesta(
    dto: CreateRespuestaDTO,
    idEncuesta: number,
  ): Promise<{ mensaje: string }> {
    // Crear la respuesta general
    const respuesta = await this.respuestaRepository.save(
      this.respuestaRepository.create({
        encuesta: { id: idEncuesta },
      }),
    );

    // Guardar respuestas abiertas
    for (const item of dto.respuestasAbiertas) {
      await this.respuestaAbiertaRepository.save({
        respuesta: { id: respuesta.id },
        pregunta: { id: item.pregunta.id },
        texto: item.texto,
      });
    }

    // Guardar respuestas opciones
    for (const item of dto.respuestasOpciones) {
      await this.respuestaOpcionRepository.save({
        respuesta: { id: respuesta.id },
        pregunta: { id: item.pregunta.id },
        opcion: { id: item.opcion.id },
      });
    }

    // Guardar respuestas verdadero/falso si existen
    if (dto.respuestasVerdaderoFalso) {
      for (const item of dto.respuestasVerdaderoFalso) {
        await this.respuestaVFRepository.save({
          respuesta: { id: respuesta.id },
          pregunta: { id: item.pregunta.id },
          valor: item.valor,
        });
      }
    }

    return {
      mensaje: 'Encuesta enviada',
    };
  }
}
