import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encuesta } from '../entities/encuesta.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';

@Injectable()
export class EncuestaService {
  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepo: Repository<Encuesta>,
  ) {}

  async create(createEncuestaDto: CreateEncuestaDto): Promise<Encuesta> {
    const nuevaEncuesta = this.encuestaRepo.create({
      ...createEncuestaDto,
      codigoRespuesta: Math.random().toString(36).substring(7),
      codigoResultados: Math.random().toString(36).substring(7),
    });

    return await this.encuestaRepo.save(nuevaEncuesta);
  }

  findAll(): Promise<Encuesta[]> {
    return this.encuestaRepo.find();
  }
}
