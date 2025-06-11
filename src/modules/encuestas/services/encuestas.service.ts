import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Encuesta } from '../entities/encuesta.entity';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';
import { v4 } from 'uuid';
import { ResultadosDto } from '../dtos/resultados.dto';
import { NubePalabrasService } from '../services/nube-palabras.service';
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';
import { PaginationResult } from '../interfaces/paginationResult';
<<<<<<< HEAD
import { Pregunta } from '../entities/pregunta.entity';
=======
import { ResultadosGraficosDto } from '../dtos/resultados.graficos.dto';
import { Respuesta } from '../entities/respuesta.entity';
>>>>>>> 5ced1b9aa5d94cdae741a699094c5d20fb344963

@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private encuestasRepository: Repository<Encuesta>,
    @InjectRepository(Respuesta)
    private respuestasRepository: Repository<Respuesta>,
    private nubePalabrasService: NubePalabrasService,
    @InjectRepository(Pregunta) private readonly preguntaRepository: Repository<Pregunta>
  ) { }

  async obtenerTodas(): Promise<Encuesta[]> {
    return await this.encuestasRepository.find({
      relations: ['preguntas', 'preguntas.opciones'],
    });
  }

  async crearEncuesta(dto: CreateEncuestaDTO): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    // ✅ Agregar opciones automáticamente si la pregunta es de tipo VERDADERO_FALSO
    for (const pregunta of dto.preguntas) {
      if (
        pregunta.tipo === 'VERDADERO_FALSO' &&
        (!pregunta.opciones || pregunta.opciones.length === 0)
      ) {
        pregunta.opciones = [
          { texto: 'Verdadero', numero: 1 },
          { texto: 'Falso', numero: 2 },
        ];
      }
    }

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

  async cambiarEstadoEncuesta(
    idEncuesta: number,
    codigo: string,
    activa: boolean,
  ): Promise<{ mensaje: string }> {
    const query = this.encuestasRepository
      .createQueryBuilder('encuesta')
      .where('encuesta.id = :id', { id: idEncuesta });
    query.andWhere('encuesta.codigoResultados= :codigo', { codigo });
    const encuesta = await query.getOne();

    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }
    encuesta.activa = activa;
    this.encuestasRepository.save(encuesta);
    return {
      mensaje: `La encuesta ha sido ${activa ? 'activada' : 'desactivada'}.`,
    };
  }

  async obtenerEncuesta(
    id: number,
    codigo: string,
    codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS,
  ): Promise<Encuesta> {
    let query: SelectQueryBuilder<Encuesta>;

    switch (codigoTipo) {
      case CodigoTipoEnum.RESPUESTA:
        query = this.encuestasRepository
          .createQueryBuilder('encuesta')
          .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
          .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
          .where('encuesta.id = :id', { id });
        query.andWhere('encuesta.codigoRespuesta = :codigo', { codigo });
        query.orderBy('pregunta.numero', 'ASC');
        query.addOrderBy('preguntaOpcion.numero', 'ASC');
        break;
      case CodigoTipoEnum.RESULTADOS:
        query = this.encuestasRepository
          .createQueryBuilder('encuesta')
          .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
          .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
          .innerJoinAndSelect('encuesta.respuestas', 'respuesta')
          .leftJoinAndSelect(
            'respuesta.respuestasOpciones',
            'preguntaRespuestaOpcion',
          )
          .leftJoinAndSelect(
            'preguntaRespuestaOpcion.opcion',
            'respuestaOpcionOpcion',
          )
          .leftJoinAndSelect(
            'respuesta.respuestasAbiertas',
            'preguntaRespuestaAbierta',
          )
          .leftJoinAndSelect(
            'preguntaRespuestaAbierta.pregunta',
            'respuestaAbiertaPregunta',
          )
          .where('encuesta.id = :id', { id });
        query.andWhere('encuesta.codigoResultados= :codigo', { codigo });
        break;
    }

    console.log('QUERY:', query.getSql());
    console.log('PARAMS:', query.getParameters());

    const encuesta = await query.getOne();

    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }
    return encuesta;
  }

  // async obtenerResultadosEncuesta(
  //   id: number,
  //   codigo: string,
  //   page: number,
  //   limit = 0,
  // ): Promise<PaginationResult<ResultadosDto>> {
  //   const preguntas = await this.preguntaRepository
  //     .createQueryBuilder('pregunta')
  //     .where('pregunta.id_encuesta = :id', { id })
  //     .orderBy('pregunta.numero')
  //     .leftJoinAndSelect('pregunta.opciones', 'opcionPregunta')
  //     .skip((page - 1) * limit)
  //     .take(5)
  //     .getMany();
  //   const query = this.encuestasRepository
  //     .createQueryBuilder('encuesta')
  //     .innerJoinAndSelect('encuesta.preguntas', 'pregunta')

  //     .leftJoinAndSelect('pregunta.opciones', 'opcionPregunta')

  //     .leftJoinAndSelect('encuesta.respuestas', 'respuesta')

  //     .leftJoinAndSelect('respuesta.respuestasOpciones', 'respuestaOpcion')
  //     .leftJoinAndSelect('respuestaOpcion.opcion', 'opcionRespuesta')
  //     .leftJoinAndSelect(
  //       'opcionRespuesta.pregunta',
  //       'preguntaDeOpcionRespuesta',
  //     )

  //     .leftJoinAndSelect('respuesta.respuestasAbiertas', 'respuestaAbierta')
  //     .leftJoinAndSelect('respuestaAbierta.pregunta', 'preguntaAbierta')

  //     .leftJoinAndSelect('respuesta.respuestasVerdaderoFalso', 'respuestaVF')
  //     .leftJoinAndSelect('respuestaVF.pregunta', 'preguntaVF')

  //     .where('encuesta.id = :id', { id });

  //   query.andWhere('encuesta.codigoResultados= :codigo', { codigo });
  //   const encuesta = await query.getOne();
  //   let isNext = false;
  //   if (preguntas.length > 4) {
  //     isNext = true;
  //     preguntas.pop();
  //   }
  //   const isPrev = page !== 1;
  //   if (encuesta) {
  //     encuesta.preguntas = preguntas;
  //   }
  //   if (!encuesta) {
  //     throw new BadRequestException('Datos de encuesta no válidos');
  //   }

  //   let resultados = this.mapearResultados(encuesta);

  //   return { data: resultados, prev: isPrev, next: isNext };
  // }

  /// *** TABLA ***

  async obtenerResultadosEncuesta(
    id: number,
    codigo: string,
    page: number,
<<<<<<< HEAD
    limit = 0
  ): Promise<PaginationResult<ResultadosDto>> {

    const preguntas = await this.preguntaRepository
      .createQueryBuilder('pregunta')
      .where('pregunta.id_encuesta = :id', { id })
      .orderBy("pregunta.numero")
      .leftJoinAndSelect('pregunta.opciones', 'opcionPregunta')
      .skip((page - 1) * limit)
      .take(5)
      .getMany();
    const query = this.encuestasRepository
      .createQueryBuilder('encuesta')
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta')

      .leftJoinAndSelect('pregunta.opciones', 'opcionPregunta')
=======
    limit = 2,
  ): Promise<PaginationResult<ResultadosDto>> {
    const encuesta = await this.encuestasRepository
      .createQueryBuilder('encuesta')
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
      .where('encuesta.id = :id', { id })
      .andWhere('encuesta.codigoResultados= :codigo', { codigo })
      .orderBy('pregunta.numero')
      .getOne();
>>>>>>> 5ced1b9aa5d94cdae741a699094c5d20fb344963

    const respuestasPaginadas = await this.respuestasRepository
      .createQueryBuilder('respuesta')
      .innerJoinAndSelect('respuesta.encuesta', 'encuesta')

      .leftJoinAndSelect('respuesta.respuestasOpciones', 'respuestaOpcion')
      .leftJoinAndSelect('respuestaOpcion.opcion', 'opcionRespuesta')
      .leftJoinAndSelect(
        'opcionRespuesta.pregunta',
        'preguntaDeOpcionRespuesta',
      )

      .leftJoinAndSelect('respuesta.respuestasAbiertas', 'respuestaAbierta')
      .leftJoinAndSelect('respuestaAbierta.pregunta', 'preguntaAbierta')

      .leftJoinAndSelect('respuesta.respuestasVerdaderoFalso', 'respuestaVF')
      .leftJoinAndSelect('respuestaVF.pregunta', 'preguntaVF')

      .where('encuesta.id = :id', { id })
      .andWhere('encuesta.codigoResultados= :codigo', { codigo })
      .skip((page - 1) * limit)
      .take(limit + 1)
      .getMany();

<<<<<<< HEAD
    query.andWhere('encuesta.codigoResultados= :codigo', { codigo });
    const encuesta = await query.getOne();
    let isNext = false
    if (preguntas.length > 4) {
      isNext = true
      preguntas.pop()
    }
    const isPrev = page !== 1
    if (encuesta) {
      encuesta.preguntas = preguntas
=======
    let isNext = false;
    if (respuestasPaginadas.length > limit) {
      isNext = true;
      respuestasPaginadas.pop();
    }
    const isPrev = page !== 1;

    if (encuesta) {
      encuesta.respuestas = respuestasPaginadas;
>>>>>>> 5ced1b9aa5d94cdae741a699094c5d20fb344963
    }
    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }
<<<<<<< HEAD

    let resultados = this.mapearResultados(encuesta);
    this.agregarNubePalabras(resultados);

    return ({ data: resultados, prev: isPrev, next: isNext });
=======

    let resultados = this.mapearResultados(encuesta);

    return { data: resultados, prev: isPrev, next: isNext };
>>>>>>> 5ced1b9aa5d94cdae741a699094c5d20fb344963
  }
  // async obtenerResultadosEncuesta(
  //   id: number,
  //   codigo: string,
  //   page: number,
  //   limit = 0
  // ): Promise<PaginationResult<ResultadosDto>> {
  //   const query = this.encuestasRepository
  //     .createQueryBuilder('encuesta')
  //     .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
  //     .take(4)
  //     .leftJoinAndSelect('pregunta.opciones', 'opcionPregunta')

  //     .leftJoinAndSelect('encuesta.respuestas', 'respuesta')

  //     .leftJoinAndSelect('respuesta.respuestasOpciones', 'respuestaOpcion')
  //     .leftJoinAndSelect('respuestaOpcion.opcion', 'opcionRespuesta')
  //     .leftJoinAndSelect(
  //       'opcionRespuesta.pregunta',
  //       'preguntaDeOpcionRespuesta',
  //     )

  //     .leftJoinAndSelect('respuesta.respuestasAbiertas', 'respuestaAbierta')
  //     .leftJoinAndSelect('respuestaAbierta.pregunta', 'preguntaAbierta')

  //     .leftJoinAndSelect('respuesta.respuestasVerdaderoFalso', 'respuestaVF')
  //     .leftJoinAndSelect('respuestaVF.pregunta', 'preguntaVF')

  //     .where('encuesta.id = :id', { id });

  //   query.andWhere('encuesta.codigoResultados= :codigo', { codigo });
  //   const encuesta = await query.getOne();

  //   if (!encuesta) {
  //     throw new BadRequestException('Datos de encuesta no válidos');
  //   }
  //   let isNext = false
  //   if (encuesta.respuestas.length > limit) {
  //     isNext = true
  //     encuesta.respuestas.pop()
  //   }
  //   const isPrev = page !== 1
  //   let resultados = this.mapearResultados(encuesta);
  //   this.agregarNubePalabras(resultados);

  //   return ({ data: resultados, prev: isPrev, next: isNext });
  // }

  private mapearResultados(encuesta: Encuesta): ResultadosDto {
    const dto: ResultadosDto = {
      id: encuesta.id,
      nombre: encuesta.nombre,
      codigoRespuesta: encuesta.codigoRespuesta,
      preguntas: encuesta.preguntas.map((p) => ({
        id: p.id,
        numero: p.numero,
        texto: p.texto,
        tipo: p.tipo,
      })),
      respuestas: [],
 
    };

    for (const respuesta of encuesta.respuestas || []) {
      for (const ro of respuesta.respuestasOpciones || []) {
        const respuestaEncuestado = dto.respuestas.find(
          (r) => r.id === respuesta.id,
        );
        if (respuestaEncuestado) {
          const preguntaRespuesta = respuestaEncuestado.respuestas.find(
            (p) => p.preguntaId === ro.preguntaId,
          );
          if (preguntaRespuesta) {
            preguntaRespuesta.textoRespuesta.push(ro.opcion.texto);
          } else {
            respuestaEncuestado.respuestas.push({
              preguntaId: ro.preguntaId,
              textoRespuesta: [ro.opcion.texto],
            });
          }
        } else {
          dto.respuestas.push({
            id: respuesta.id,
            respuestas: [
              {
                preguntaId: ro.preguntaId,
                textoRespuesta: [ro.opcion.texto],
              },
            ],
          });
        }
      }
      for (const ra of respuesta.respuestasAbiertas || []) {
        const respuestaEncuestado = dto.respuestas.find(
          (r) => r.id === respuesta.id,
        );
        if (respuestaEncuestado) {
          respuestaEncuestado.respuestas.push({
            preguntaId: ra.preguntaId,
            textoRespuesta: [ra.texto],
          });
        } else {
          dto.respuestas.push({
            id: respuesta.id,
            respuestas: [
              {
                preguntaId: ra.preguntaId,
                textoRespuesta: [ra.texto],
              },
            ],
          });
        }
      }
      for (const rvf of respuesta.respuestasVerdaderoFalso || []) {
        const respuestaEncuestado = dto.respuestas.find(
          (r) => r.id === respuesta.id,
        );
        if (respuestaEncuestado) {
          respuestaEncuestado.respuestas.push({
            preguntaId: rvf.pregunta.id,
            textoRespuesta: [rvf.valor ? 'Verdadero' : 'Falso'],
          });
        } else {
          dto.respuestas.push({
            id: respuesta.id,
            respuestas: [
              {
                preguntaId: rvf.pregunta.id,
                textoRespuesta: [rvf.valor ? 'Verdadero' : 'Falso'],
              },
            ],
          });
        }
      }
    }

    return dto;
  }

  /// *** GRÁFICOS ***

  async obtenerResultadosGraficoEncuesta(
    id: number,
    codigo: string,
  ): Promise<ResultadosGraficosDto> {
    const query = this.encuestasRepository
      .createQueryBuilder('encuesta')
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
      .take(4)
      .leftJoinAndSelect('pregunta.opciones', 'opcionPregunta')

      .leftJoinAndSelect('encuesta.respuestas', 'respuesta')

      .leftJoinAndSelect('respuesta.respuestasOpciones', 'respuestaOpcion')
      .leftJoinAndSelect('respuestaOpcion.opcion', 'opcionRespuesta')
      .leftJoinAndSelect(
        'opcionRespuesta.pregunta',
        'preguntaDeOpcionRespuesta',
      )

      .leftJoinAndSelect('respuesta.respuestasAbiertas', 'respuestaAbierta')
      .leftJoinAndSelect('respuestaAbierta.pregunta', 'preguntaAbierta')

      .leftJoinAndSelect('respuesta.respuestasVerdaderoFalso', 'respuestaVF')
      .leftJoinAndSelect('respuestaVF.pregunta', 'preguntaVF')

      .orderBy('pregunta.numero')

      .where('encuesta.id = :id', { id });

    query.andWhere('encuesta.codigoResultados= :codigo', { codigo });
    const encuesta = await query.getOne();

    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }
    let resultados = this.mapearResultadosGrafico(encuesta);
    this.agregarNubePalabras(resultados);

    return resultados;
  }

  private mapearResultadosGrafico(encuesta: Encuesta): ResultadosGraficosDto {
    const dto: ResultadosGraficosDto = {
      id: encuesta.id,
      nombre: encuesta.nombre,
      codigoRespuesta: encuesta.codigoRespuesta,
      preguntas: encuesta.preguntas.map((p) => ({
        id: p.id,
        numero: p.numero,
        texto: p.texto,
        tipo: p.tipo,
        opciones: p.opciones || [],
        respuestasOpciones: [],
        respuestasAbiertas: [],
        respuestasVF: [],
        frecuenciaPalabras: [],
      })),
      activa: encuesta.activa,
    };

    for (const respuesta of encuesta.respuestas || []) {
      for (const ro of respuesta.respuestasOpciones || []) {
        const pregunta = dto.preguntas.find((p) => p.id === ro.preguntaId);
        if (pregunta) {
          // Buscar si ya existe conteo para esa opción
          const conteo = pregunta.respuestasOpciones.find(
            (r) => r.opcionId === ro.opcionId,
          );
          if (conteo) {
            conteo.cantidad += 1;
          } else {
            pregunta.respuestasOpciones.push({
              id: ro.id,
              opcionId: ro.opcionId,
              cantidad: 1,
            });
          }
        }
      }
      for (const ra of respuesta.respuestasAbiertas || []) {
        const pregunta = dto.preguntas.find((p) => p.id === ra.preguntaId);
        if (pregunta) {
          pregunta.respuestasAbiertas.push({
            id: ra.id,
            texto: ra.texto,
          });
        }
      }
      for (const rvf of respuesta.respuestasVerdaderoFalso || []) {
        const pregunta = dto.preguntas.find((p) => p.id === rvf.pregunta.id);
        if (pregunta) {
          const conteo = pregunta.respuestasVF.find(
            (r) => rvf.valor === r.valor,
          );
          if (conteo) {
            conteo.cantidad += 1;
          } else {
            pregunta.respuestasVF.push({
              id: rvf.id,
              valor: rvf.valor,
              cantidad: 1,
            });
          }
        }
      }
    }

    return dto;
  }

  private agregarNubePalabras(resultados: ResultadosGraficosDto): void {
    for (const pregunta of resultados.preguntas || []) {
      if (pregunta.tipo === TiposRespuestaEnum.ABIERTA) {
        pregunta.frecuenciaPalabras =
          this.nubePalabrasService.generarNubePalabras(
            pregunta.respuestasAbiertas.map((ra) => {
              return ra.texto;
            }),
          );
      }
    }
  }
}