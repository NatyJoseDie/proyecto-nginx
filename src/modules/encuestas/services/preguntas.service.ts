import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from '../entities/pregunta.entity';
import { CreatePreguntaDTO } from '../dtos/create-pregunta.dto';
import { UpdatePreguntaDTO } from '../dtos/update-pregunta.dto';
import { Opcion } from '../entities/opcion.entity';
import { CreateOpcionDTO } from '../dtos/create-opcion.dto';
import { error } from 'console';
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';

@Injectable()
export class PreguntasService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
    @InjectRepository(Opcion)
    private readonly opcionRepository: Repository<Opcion>,
  ) {}

  async findAll() {
    return await this.preguntaRepository.find({
      relations: ['opciones'],
    });
  }

  async findOne(id: number) {
    const pregunta = await this.preguntaRepository.findOne({
      where: { id },
      relations: ['opciones'],
    });
    if (!pregunta) {
      throw new NotFoundException(`Pregunta con ID ${id} no encontrada`);
    }
    return pregunta;
  }

  async create(createPreguntaDto: CreatePreguntaDTO) {
    if (createPreguntaDto.tipo === TiposRespuestaEnum.ABIERTA) {
      delete createPreguntaDto.opciones;
    }
    return await this.preguntaRepository.save(createPreguntaDto);
  }
  /*   async create(createPreguntaDto: CreatePreguntaDTO) {
    const { opciones, ...preguntaData } = createPreguntaDto;

    // Crear la pregunta sin opciones primero
    const nuevaPregunta = this.preguntaRepository.create(preguntaData);
    const preguntaGuardada = await this.preguntaRepository.save(nuevaPregunta);

    // Si se proporcionan opciones, crearlas por separado

    if (opciones && opciones.length > 0) {
      const opcionesEntities  = opciones.map((texto) => {
        return {
          texto,
          pregunta: preguntaGuardada,
        };
      });

      // Guardar opciones con referencia a la pregunta
       await this.opcionRepository.save(opcionesEntities);
    }

    return this.findOne(preguntaGuardada.id);
  } */

  async update(id: number, updatePreguntaDto: UpdatePreguntaDTO) {
    const pregunta = await this.findOne(id);
    const { opciones, ...preguntaData } = updatePreguntaDto;

    // Actualizar los datos de la pregunta
    this.preguntaRepository.merge(pregunta, preguntaData);
    await this.preguntaRepository.save(pregunta);

    // Si se proporcionan opciones, actualizarlas
    if (opciones) {
      // Eliminar opciones existentes
      await this.opcionRepository.delete({ pregunta: { id } });

      // Crear nuevas opciones
      if (opciones.length > 0) {
        const opcionesEntities = opciones.map((texto) => ({
          texto,
          pregunta,
        }));
        // await this.opcionRepository.save(opcionesEntities);
      }
    }
    throw new HttpException(
      'Chequear metodo , error de tipos',
      HttpStatus.BAD_REQUEST,
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    const pregunta = await this.findOne(id);
    return await this.preguntaRepository.remove(pregunta);
  }
}
