import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { Encuesta } from '../entities/encuesta.entity';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';

@Injectable()
export class RespuestaService {
  constructor(
    @InjectRepository(Respuesta)
    private respuestaRepository: Repository<Respuesta>,
    @InjectRepository(Encuesta)
    private encuestaRepository: Repository<Encuesta>,
  ) {}

  async create(createRespuestaDto: CreateRespuestaDto) {
    const encuesta = await this.encuestaRepository.findOne({
      where: { id: createRespuestaDto.encuestaId },
    });

    if (!encuesta) {
      throw new NotFoundException('Encuesta no encontrada');
    }

    const respuesta = this.respuestaRepository.create({
      encuesta: encuesta,
    });

    return this.respuestaRepository.save(respuesta);
  }
}
