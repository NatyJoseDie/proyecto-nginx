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
  ) {}

  async crearRespuesta(
    dto: CreateRespuestaDTO,
    idEncuesta: number,
    codigo: string,
  ): Promise<{
    mensaje: string;
  }> {
    const query = this.encuestasRepository
      .createQueryBuilder('encuesta')
      .where('encuesta.id = :id', { id: idEncuesta });
    query.andWhere('encuesta.codigoResultados= :codigo', { codigo });
    const encuesta = await query.getOne();

    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }

    const respuesta: Respuesta = this.respuestaRepository.create({
      encuesta: { id: idEncuesta },
      ...dto,
    });

    await this.respuestaRepository.save(respuesta);
    return {
      mensaje: 'Encuesta enviada',
    };
  }
}
