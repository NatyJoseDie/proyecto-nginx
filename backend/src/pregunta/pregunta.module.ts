import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntaController } from './pregunta.controller';
import { PreguntaService } from './pregunta.service';
import { Pregunta } from '../entities/pregunta.entity';
import { Encuesta } from '../entities/encuesta.entity';
import { Opcion } from '../entities/opcion.entity'; // <-- Agrega este import

@Module({
  imports: [
    TypeOrmModule.forFeature([Pregunta, Encuesta, Opcion]), // <-- Corrige aquí
  ],
  controllers: [PreguntaController],
  providers: [PreguntaService],
})
export class PreguntaModule {}
