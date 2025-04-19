import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opcion } from '../../entities/opcion.entity';
import { Pregunta } from '../../entities/pregunta.entity';
import { CreateOpcionDto } from './dto/create-opcion.dto';

@Injectable()
export class OpcionPreguntaService {  // Cambiado de OpcionService a OpcionPreguntaService
  constructor(
    @InjectRepository(Opcion)
    private readonly opcionRepo: Repository<Opcion>,
    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,
  ) {}

  async createOpcionPregunta(dto: CreateOpcionDto): Promise<Opcion> {  // Cambiado de create a createOpcionPregunta
    const pregunta = await this.preguntaRepo.findOne({
      where: { id: dto.preguntaId },
    });

    if (!pregunta) {
      throw new NotFoundException(`Pregunta con ID ${dto.preguntaId} no encontrada`);
    }

    const nuevaOpcion = this.opcionRepo.create({
      texto: dto.texto,
      numero: dto.numero,
      pregunta: pregunta,
    });

    return this.opcionRepo.save(nuevaOpcion);
  }

  findAll(): Promise<Opcion[]> {
    return this.opcionRepo.find({ relations: ['pregunta'] });
  }
}