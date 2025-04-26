import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encuesta } from '../entities/encuesta.entity';
import { CreateEncuestaDto } from '../dtos/create-encuesta.dto';

@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepo: Repository<Encuesta>,
  ) {}

  findAll() {
    return this.encuestaRepo.find();
  }

  create(createEncuestaDto: CreateEncuestaDto) {
    const encuesta = this.encuestaRepo.create(createEncuestaDto);
    return this.encuestaRepo.save(encuesta);
  }
}
