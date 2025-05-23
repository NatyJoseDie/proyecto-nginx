// import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Encuesta } from '../entities/encuesta.entity';
// import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
// import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';
// import { v4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { Repository } from 'typeorm';
import { CreateRespuestaDTO } from '../dtos/create-respuesta.dto';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
  ) {}

  async crearRespuesta(dto: CreateRespuestaDTO, idEncuesta: number) {
    // const respuesta: Respuesta = this.respuestaRepository.create({
    //   encuesta: { id: idEncuesta },
    //   ...dto,
    // });
    const respuesta = new Respuesta();
    Object.assign(respuesta, dto);

    return await this.respuestaRepository.save(respuesta);
  }
}
