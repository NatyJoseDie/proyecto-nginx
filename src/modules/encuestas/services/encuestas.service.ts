import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Encuesta } from '../entities/encuesta.entity';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { CreateEncuestaDTO } from '../dtos/create-encuesta.dto';
import { v4 } from 'uuid';
import { EstadisticasDto } from '../dtos/estadisticas-resultados.dto';

@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private encuestasRepository: Repository<Encuesta>,
  ) {}

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
  async obtenerEstadisticaEncuesta(
    id: number,
    codigo: string,
  ): Promise<EstadisticasDto> {
    const query = this.encuestasRepository
      .createQueryBuilder('encuesta')
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
      .leftJoinAndSelect('pregunta.opciones', 'opcionPregunta')

      .innerJoinAndSelect('encuesta.respuestas', 'respuesta')

      .leftJoinAndSelect('respuesta.respuestasOpciones', 'respuestaOpcion')
      .leftJoinAndSelect('respuestaOpcion.opcion', 'opcionRespuesta')
      .leftJoinAndSelect(
        'opcionRespuesta.pregunta',
        'preguntaDeOpcionRespuesta',
      )

      .leftJoinAndSelect('respuesta.respuestasAbiertas', 'respuestaAbierta')
      .leftJoinAndSelect('respuestaAbierta.pregunta', 'preguntaAbierta')

      .where('encuesta.id = :id', { id });

    query.andWhere('encuesta.codigoResultados= :codigo', { codigo });
    const encuesta = await query.getOne();

    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }

    return this.crearEstadisticas(encuesta);
  }

  private crearEstadisticas(encuesta: Encuesta): EstadisticasDto {
    const dto: EstadisticasDto = {
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
      })),
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
    }

    return dto;
  }
}
