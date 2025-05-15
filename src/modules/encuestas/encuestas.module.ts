import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntasController } from './controllers/preguntas.controller';
import { PreguntasService } from './services/preguntas.service';
import { Pregunta } from './entities/pregunta.entity';
import { Opcion } from './entities/opcion.entity';
import { Encuesta } from './entities/encuesta.entity';
import { EncuestasController } from './controllers/encuestas.controller';
import { EncuestasService } from './services/encuestas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta, Opcion, Encuesta])],
  controllers: [PreguntasController, EncuestasController],
  providers: [PreguntasService, EncuestasService],
  exports: [PreguntasService, EncuestasService],
})
export class EncuestasModule {}
