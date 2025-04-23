import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcionRespuestaController } from './opcion-respuesta.controller';
import { OpcionRespuestaService } from './opcion-respuesta.service';
import { RespuestaOpcion } from '../../entities/respuesta-opcion.entity';
import { Respuesta } from '../../entities/respuesta.entity';
import { Opcion } from '../../entities/opcion.entity';
import { Pregunta } from '../../entities/pregunta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RespuestaOpcion, Respuesta, Opcion]), // <-- Agrega aquí todas las entidades usadas en el service
  ],
  controllers: [OpcionRespuestaController],
  providers: [OpcionRespuestaService],
})
export class OpcionRespuestaModule {}
