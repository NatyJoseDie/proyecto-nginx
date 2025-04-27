import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encuesta } from '../entities/encuesta.entity';
import { CreateEncuestaDto } from '../dtos/create-encuesta.dto';
import { UpdateEncuestaDto } from '../dtos/update-encuesta.dto';

@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,
  ) {}

  async findAll() {
    return await this.encuestaRepository.find();
  }

  async findOne(id: number) {
    const encuesta = await this.encuestaRepository.findOne({ where: { id } });
    if (!encuesta) {
      throw new NotFoundException(`Encuesta con ID ${id} no encontrada`);
    }
    return encuesta;
  }

  async create(createEncuestaDto: CreateEncuestaDto) {
    const nuevaEncuesta = this.encuestaRepository.create(createEncuestaDto);
    return await this.encuestaRepository.save(nuevaEncuesta);
  }

  async update(id: number, updateEncuestaDto: UpdateEncuestaDto) {
    const encuesta = await this.findOne(id);
    this.encuestaRepository.merge(encuesta, updateEncuestaDto);
    return await this.encuestaRepository.save(encuesta);
  }

  async remove(id: number) {
    const encuesta = await this.findOne(id);
    return await this.encuestaRepository.remove(encuesta);
  }
}
