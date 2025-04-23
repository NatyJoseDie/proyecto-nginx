import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encuesta } from '../entities/encuesta.entity';
import { Respuesta } from '../entities/respuesta.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EncuestaService {
  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepo: Repository<Encuesta>,
    @InjectRepository(Respuesta)
    private readonly respuestaRepo: Repository<Respuesta>,
  ) {}

  findAll() {
    return this.encuestaRepo.find();
  }

  async createRespuesta(encuestaId: number) {
    const encuesta = await this.encuestaRepo.findOne({
      where: { id: encuestaId },
    });

    if (!encuesta) {
      throw new Error('Encuesta no encontrada');
    }

    const respuesta = this.respuestaRepo.create({
      encuesta,
      codigoAcceso: uuidv4(),
      fechaCreacion: new Date(),
    });

    return this.respuestaRepo.save(respuesta);
  }
}
