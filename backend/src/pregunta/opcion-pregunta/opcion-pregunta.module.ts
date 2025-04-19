import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opcion } from '../../entities/opcion.entity';
import { Pregunta } from '../../entities/pregunta.entity';
import { OpcionPreguntaService } from './opcion-pregunta.service';
import { OpcionPreguntaController } from './opcion-pregunta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Opcion, Pregunta])],
  providers: [OpcionPreguntaService], // Use the correct service name
  controllers: [OpcionPreguntaController],
})
export class OpcionPreguntaModule {}
