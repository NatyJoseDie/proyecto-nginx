import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Encuesta } from '../entities/encuesta.entity';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';
import { v4 } from 'uuid';
// import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';
import { Pregunta } from '../entities/pregunta.entity';
import { RespuestaAbierta } from '../entities/respuesta-abierta.entity';
import { RespuestaOpcion } from '../entities/respuesta-opcion.entity';

@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private encuestasRepository: Repository<Encuesta>,
    @InjectRepository(RespuestaAbierta)
    private readonly respuestaAbiertaRepository: Repository<RespuestaAbierta>,
    @InjectRepository(RespuestaOpcion)
    private readonly respuestaOpcionRepository: Repository<RespuestaOpcion>,
  ) {}

  async crearEncuesta(dto: CreateEncuestaDTO): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    const encuesta: Encuesta = this.encuestasRepository.create({
      ...dto,
      codigoRespuesta: v4(),
      codigoResultados: v4(),
    });

    const encuestaGuardada = await this.encuestasRepository.save(encuesta);
    return {
      id: encuestaGuardada.id,
      codigoRespuesta: encuestaGuardada.codigoRespuesta,
      codigoResultados: encuestaGuardada.codigoResultados,
    };
  }
  async getById(id: number, relations?: string[]) {
    return await this.encuestasRepository.findOne({
      where: { id },
      relations: relations,
    });
  }

  async obtenerEncuesta(
    id: number,
    codigo: string,
    codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS,
  ) {
    let query: SelectQueryBuilder<any>;
    //  let query = this.encuestasRepository
    //     .createQueryBuilder('encuesta')
    //     .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
    //     .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
    //     .where('encuesta.id = :id', { id });

    switch (codigoTipo) {
      case CodigoTipoEnum.RESPUESTA:
        query = this.encuestasRepository
          .createQueryBuilder('encuesta')
          .addCommonTableExpression('', 'n')
          // query = this.encuestasRepository
          //   .createQueryBuilder('encuesta')
          //   .innerJoinAndSelect('encuesta.respuestas', 'respuesta')
          //   .innerJoinAndSelect(
          //     'respuesta.respuestasAbiertas',
          //     'respuestasAbiertas',
          //   )
          //   .where('respuestasAbiertas.id_respuesta = respuesta.id')

          .where('encuesta.id = :id', { id });
        query.andWhere('encuesta.codigoRespuesta= :codigo', { codigo });
        // ////////////////
        // query = this.encuestasRepository

        //   .createQueryBuilder('encuesta')
        //   .leftJoinAndSelect('encuesta.respuestas', 'respuesta')

        //   .where('encuesta.id = :id', { id });

        // query.andWhere('encuesta.codigoRespuesta= :codigo', { codigo });
        /////////////////
        // query = this.encuestasRepository

        //   .createQueryBuilder('encuesta')
        //   .innerJoinAndSelect('encuesta.preguntas', 'pregunta')

        //   .innerJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
        //   .innerJoinAndSelect('encuesta.respuestas', 'respuesta')
        //   .leftJoinAndSelect(
        //     'respuesta.respuestasOpciones',
        //     'preguntaRespuestaOpcion',
        //   )
        //   .leftJoinAndSelect(
        //     'preguntaRespuestaOpcion.opcion',
        //     'respuestaOpcionOpcion',
        //   )
        //   .leftJoinAndSelect(
        //     'respuesta.respuestasAbiertas',
        //     'preguntaRespuestaAbierta',
        //   )
        //   .leftJoinAndSelect(
        //     'preguntaRespuestaAbierta.pregunta',
        //     'respuestaAbiertaPregunta',
        //   )
        //   .where('encuesta.id = :id', { id });
        // query.andWhere('encuesta.codigoRespuesta= :codigo', { codigo });
        // query.orderBy('pregunta.numero', 'ASC');
        // query.addOrderBy('preguntaOpcion.numero', 'ASC');

        break;

      case CodigoTipoEnum.RESULTADOS:
        query = this.encuestasRepository
          .createQueryBuilder('encuesta')
          .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
          .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')

          .where('encuesta.id = :id', { id });
        query.andWhere('encuesta.codigoResultados = :codigo', { codigo });
        query.orderBy('pregunta.numero', 'ASC');
        query.addOrderBy('preguntaOpcion.numero', 'ASC');

        break;
    }

    const encuesta = await query.getOne();

    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }

    return encuesta;
  }
  // async obtenerEncuesta(
  //   id: number,
  //   codigo: string,
  //   codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS,
  // ) {
  //   let query: SelectQueryBuilder<Encuesta>;

  //   switch (codigoTipo) {
  //     case CodigoTipoEnum.RESPUESTA:
  //       query = this.encuestasRepository
  //         .createQueryBuilder('encuesta')
  //         .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
  //         .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
  //         .where('encuesta.id = :id', { id });
  //       query.andWhere('encuesta.codigoRespuesta = :codigo', { codigo });
  //       query.orderBy('pregunta.numero', 'ASC');
  //       query.addOrderBy('preguntaOpcion.numero', 'ASC');
  //       break;
  //     case CodigoTipoEnum.RESULTADOS:
  //       query = this.encuestasRepository

  //         .createQueryBuilder('encuesta')
  //         .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
  //         .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
  //         .innerJoinAndSelect('encuesta.respuestas', 'respuesta')
  //         .leftJoinAndSelect(
  //           'respuesta.respuestasOpciones',
  //           'preguntaRespuestaOpcion',
  //         )
  //         .leftJoinAndSelect(
  //           'preguntaRespuestaOpcion.opcion',
  //           'respuestaOpcionOpcion',
  //         )
  //         .leftJoinAndSelect(
  //           'respuesta.respuestasAbiertas',
  //           'preguntaRespuestaAbierta',
  //         )
  //         .leftJoinAndSelect(
  //           'preguntaRespuestaAbierta.pregunta',
  //           'respuestaAbiertaPregunta',
  //         )
  //         .where('encuesta.id = :id', { id });
  //       query.andWhere('encuesta.codigoResultados= :codigo', { codigo });

  //       break;
  //   }

  //   console.log('QUERY:', query.getSql());
  //   console.log('PARAMS:', query.getParameters());

  //   const encuesta = await query.getOne();

  //   if (!encuesta) {
  //     throw new BadRequestException('Datos de encuesta no válidos');
  //   }
  //   return encuesta;
  // }
  async seedDb() {
    const queryBuilder = this.encuestasRepository.createQueryBuilder();
    // const encuestasRaw = [
    //   {
    //     nombre: 'encuesta',
    //     preguntas: [
    //       { tipo: 'ABIERTA', texto: 'Que lenguajes de programacion manejas ' },
    //     ],
    //   },
    // ];
    const encuesta: Encuesta = new Encuesta();
    const pregunta: Pregunta = new Pregunta();
    Object.assign(pregunta, {
      tipo: 'ABIERTA',
      numero: 1,
      texto: 'Que lenguajes de programacion manejas 678?',
    });
    Object.assign(encuesta, {
      nombre: 'encuesta batch test',
      codigoRespuesta: v4(),
      codigoResultados: v4(),
      preguntas: [pregunta],
    });
    const encuestas: Encuesta[] = [encuesta];

    return await queryBuilder
      .insert()
      .into(Encuesta)
      .values(encuestas)
      .execute();
  }
}
