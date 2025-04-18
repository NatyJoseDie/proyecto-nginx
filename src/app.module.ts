import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncuestaController } from './encuesta/encuesta.controller';
import { EncuestaService } from './encuesta/encuesta.service';
import { Encuesta } from './entities/encuesta.entity';
import { Pregunta } from './entities/pregunta.entity';
import { Opcion } from './entities/opcion.entity';
import { Respuesta } from './entities/respuesta.entity';
import { RespuestaOpcion } from './entities/respuesta-opcion.entity';
import { RespuestaAbierta } from './entities/respuesta-abierta.entity';
import { ConfiguracionAccesibilidad } from './entities/configuracion-accesibilidad.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'encuesta_web',
      entities: [
        Encuesta,
        Pregunta,
        Opcion,
        Respuesta,
        RespuestaOpcion,
        RespuestaAbierta,
        ConfiguracionAccesibilidad  // Added this line
      ],
      synchronize: true,
      logging: true,
    }),
    
    TypeOrmModule.forFeature([Encuesta]),
  ],
  controllers: [EncuestaController],
  providers: [EncuestaService],
})
export class AppModule {}
