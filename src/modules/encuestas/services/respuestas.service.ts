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
import { RespuestaAbierta } from '../entities/respuesta-abierta.entity';
import { Pregunta } from '../entities/pregunta.entity';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,
    @InjectRepository(RespuestaOpcion)
    private readonly respuestaOpcionRepository: Repository<RespuestaOpcion>,
    @InjectRepository(RespuestaAbierta)
    private readonly respuestaAbiertaRepository: Repository<RespuestaAbierta>,
  ) {}

  async createRespuestaAbierta(
    dto: CreateRespuestaDTO,
    idEncuesta: number,
    pregunta: Pregunta,
  ) {
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
      await this.respuestaAbiertaRepository.save({
        texto: dto.texto,
        pregunta,
        respuesta: savedRespuesta,
      });
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
    opcion: Opcion,
  ) {
    const encuesta = await this.encuestaRepository.findOneBy({
      id: idEncuesta,
    });
    const respuesta = new Respuesta();
    Object.assign(respuesta, { encuesta });
    const respuestaOpcion = new RespuestaOpcion();
    Object.assign(respuestaOpcion, { respuesta, opcion });

    if (!encuesta) {
      throw new HttpException('No existe encuesta', HttpStatus.NOT_FOUND);
    }
    return await this.respuestaOpcionRepository.save(respuestaOpcion);
  }
  // async createRespuestaCerrada(
  //   dto: CreateRespuestaDTO,
  //   idPregunta: number,
  //   idEncuesta: number,
  //   respuestaOpcion: Opcion,
  // ) {
  //   try {
  //     const encuesta = await this.encuestaRepository.findOneBy({
  //       id: idEncuesta,
  //     });
  //     if (!encuesta) {
  //       throw new HttpException('No existe encuesta', HttpStatus.NOT_FOUND);
  //     }

  //     const respuesta = new Respuesta();

  //     Object.assign(respuesta, {
  //       respuestasAbiertas: [],
  //       encuesta,
  //       respuestasOpciones: [respuestaOpcion],
  //     });
  //     const savedRespuesta = await this.respuestaRepository.save(respuesta);
  //     console.log('saved rta', savedRespuesta);
  //     const respuestaCerrada = new RespuestaOpcion();
  //     Object.assign(respuestaCerrada, {
  //       id_respuesta: savedRespuesta.id,
  //       id_opcion: respuestaOpcion.id,
  //     });
  //     return await this.respuestaOpcionRepository.save(respuestaCerrada);
  //   } catch (error) {
  //     console.log('in error', error);
  //     throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
