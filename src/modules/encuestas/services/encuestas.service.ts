import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encuesta } from '../entities/encuesta.entity';
import { CreateEncuestaDto } from '../dtos/create-encuesta.dto';
import { UpdateEncuestaDto } from '../dtos/update-encuesta.dto';
import { v4 as uuidv4 } from 'uuid';

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
    const nuevaEncuesta = this.encuestaRepository.create({
      ...createEncuestaDto,
      codigoRespuesta: uuidv4(),
      codigoResultados: uuidv4(),
    });
    return await this.encuestaRepository.save(nuevaEncuesta);
  }

  async obtenerPorCodigoRespuesta(codigo: string) {
    return await this.encuestaRepository.findOne({
      where: { codigoRespuesta: codigo },
      relations: ['preguntas', 'preguntas.opciones'],
    });
  }

  async obtenerPorCodigoResultados(codigo: string) {
    return await this.encuestaRepository.findOne({
      where: { codigoResultados: codigo },
      relations: ['preguntas', 'preguntas.opciones', 'respuestas'],
    });
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
