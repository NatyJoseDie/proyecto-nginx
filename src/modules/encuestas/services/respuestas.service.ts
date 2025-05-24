// import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Encuesta } from '../entities/encuesta.entity';
// import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
// import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';
// import { v4 } from 'uuid';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { Repository } from 'typeorm';
import { CreateRespuestaDTO } from '../dtos/create-respuesta.dto';
import { Encuesta } from '../entities/encuesta.entity';
import { RespuestaOpcion } from '../entities/respuesta-opcion.entity';
import { Opcion } from '../entities/opcion.entity';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
    @InjectRepository(Encuesta)
    private encuestaRepository: Repository<Encuesta>,
    @InjectRepository(RespuestaOpcion)
    private respuestaOpcionRepository: Repository<RespuestaOpcion>,
  ) {}

  async createRespuestaAbierta(dto: CreateRespuestaDTO, idEncuesta: number) {
    // const respuesta: Respuesta = this.respuestaRepository.create({
    //   encuesta: { id: idEncuesta },
    //   ...dto,
    // });

    try {
      const encuesta = await this.encuestaRepository.findOneBy({
        id: idEncuesta,
      });
      if (!encuesta) {
        throw new HttpException('No existe encuesta', HttpStatus.NOT_FOUND);
      }
      const respuesta = new Respuesta();

      Object.assign(respuesta, { respuestasAbiertas: [dto.texto], encuesta });
      const savedRespuesta = await this.respuestaRepository.save(respuesta);
      return savedRespuesta;
    } catch (error) {
      console.log('in error', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async createRespuestaCerrada(
    dto: CreateRespuestaDTO,
    idPregunta: number,
    idEncuesta: number,
    respuestaOpcion: Opcion,
  ) {
    try {
      const encuesta = await this.encuestaRepository.findOneBy({
        id: idEncuesta,
      });
      if (!encuesta) {
        throw new HttpException('No existe encuesta', HttpStatus.NOT_FOUND);
      }

      const respuesta = new Respuesta();

      Object.assign(respuesta, {
        respuestasAbiertas: [dto.texto],
        encuesta,
        respuestasOpciones: [respuestaOpcion],
      });
      const savedRespuesta = await this.respuestaRepository.save(respuesta);

      const respuestaCerrada = new RespuestaOpcion();
      Object.assign(respuestaCerrada, {
        texto: dto.texto,
        id_pregunta: idPregunta,
        id_respuesta: savedRespuesta.id,
        id_opcion: respuesta.id,
      });
      return await this.respuestaOpcionRepository.save(respuestaCerrada);
    } catch (error) {
      console.log('in error', error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
