import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RespuestaOpcion } from '../../entities/respuesta-opcion.entity';
import { Respuesta } from '../../entities/respuesta.entity';
import { Opcion } from '../../entities/opcion.entity';
import { CreateOpcionRespuestaDto } from './dto/create-opcion-respuesta.dto';

@Injectable()
export class OpcionRespuestaService {
  constructor(
    @InjectRepository(RespuestaOpcion)
    private respuestaOpcionRepo: Repository<RespuestaOpcion>,
    @InjectRepository(Respuesta)
    private respuestaRepo: Repository<Respuesta>,
    @InjectRepository(Opcion)
    private opcionRepo: Repository<Opcion>,
  ) {}

  async createRespuesta(dto: CreateOpcionRespuestaDto) {
    const respuesta = await this.respuestaRepo.findOne({
      where: { id: dto.respuestaId }
    });

    const opcion = await this.opcionRepo.findOne({
      where: { id: dto.opcionId }
    });

    if (!respuesta || !opcion) {
      throw new NotFoundException('Respuesta u opción no encontrada');
    }

    const respuestaOpcion = this.respuestaOpcionRepo.create({
      respuesta,
      opcion,
      fechaRespuesta: new Date()
    });

    return this.respuestaOpcionRepo.save(respuestaOpcion);
}

  findAll() {
    return this.respuestaOpcionRepo.find({
      relations: ['respuesta', 'opcion'],
    });
  }
}