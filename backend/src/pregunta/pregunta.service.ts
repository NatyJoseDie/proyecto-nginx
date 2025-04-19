import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from '../entities/pregunta.entity';
import { Encuesta } from '../entities/encuesta.entity';
import { Opcion } from '../entities/opcion.entity'; // <-- Agrega este import
import { CreatePreguntaDto } from './dto/create-pregunta.dto';

@Injectable()
export class PreguntaService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,

    @InjectRepository(Encuesta)
    private readonly encuestaRepo: Repository<Encuesta>,

    @InjectRepository(Opcion)
    private readonly opcionPreguntaRepo: Repository<Opcion>, // <-- Corrige aquí
  ) {}

  async create(dto: CreatePreguntaDto): Promise<Pregunta> {
    const encuesta = await this.encuestaRepo.findOne({
      where: { id: dto.encuestaId },
    });

    if (!encuesta) {
      throw new NotFoundException(`Encuesta con ID ${dto.encuestaId} no encontrada`);
    }

    const nuevaPregunta = this.preguntaRepo.create({
      texto: dto.texto,
      numero: dto.numero,
      encuesta: encuesta,
    });

    const preguntaGuardada = await this.preguntaRepo.save(nuevaPregunta);

    if (dto.opciones && dto.opciones.length > 0) {
      const opciones = dto.opciones.map(op => {
        return this.opcionPreguntaRepo.create({
          texto: op.texto,
          pregunta: preguntaGuardada,
        });
      });

      await this.opcionPreguntaRepo.save(opciones);
    }

    return preguntaGuardada;
  }

  findAll(): Promise<Pregunta[]> {
    return this.preguntaRepo.find({
      relations: ['encuesta', 'opciones'], // incluímos opciones en findAll
    });
  }
}
