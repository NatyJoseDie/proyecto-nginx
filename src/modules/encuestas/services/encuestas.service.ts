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

@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private encuestasRepository: Repository<Encuesta>,
    private nubePalabrasService: NubePalabrasService,
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

  async obtenerResultadosEncuesta(
    id: number,
    codigo: string,
  ): Promise<ResultadosDto> {
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
    let resultados = this.mapearResultados(encuesta);
    this.agregarNubePalabras(resultados);

    return resultados;
  }

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
        opciones: p.opciones || [],
        respuestasOpciones: [],
        respuestasAbiertas: [],
        frecuenciaPalabras: [],
      })),
      respuestas: [],
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
        const pregunta = dto.preguntas.find((p) => p.id === ra.preguntaId);
        if (pregunta) {
          pregunta.respuestasAbiertas.push({
            id: ra.id,
            texto: ra.texto,
          });
        }
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
    }

    return dto;
  }

  private agregarNubePalabras(resultados: ResultadosDto): void {
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
