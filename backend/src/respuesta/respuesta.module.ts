import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from '../entities/respuesta.entity';
import { Encuesta } from '../entities/encuesta.entity';
import { RespuestaController } from './respuesta.controller';
import { RespuestaService } from './respuesta.service';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta, Encuesta])],
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestaModule {}