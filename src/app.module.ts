import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { EncuestasModule } from './modules/encuestas/encuestas.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EncuestasModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        synchronize: false,
        autoLoadEntities: true,
        logging: configService.get('database.logging'),
        logger: configService.get('database.logger'),
      }),
    }),
  ],
=======
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
import { PreguntaModule } from './pregunta/pregunta.module';
import { RespuestaModule } from './respuesta/respuesta.module';
import { OpcionRespuestaModule } from './respuesta/opcion-respuesta/opcion-respuesta.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD || '31553487',
      database: 'encuesta_web',
      entities: [
        Encuesta,
        Pregunta,
        Opcion,
        Respuesta,
        RespuestaOpcion,
        RespuestaAbierta,
        ConfiguracionAccesibilidad, // Added this line
      ],
      synchronize: true,
      logging: true,
    }),

    TypeOrmModule.forFeature([Encuesta, Pregunta, Respuesta]), // Added Pregunta
    TypeOrmModule.forFeature([Encuesta, Pregunta, Respuesta]), // Added Pregunta
    PreguntaModule,
    RespuestaModule, // Añade esta línea
    OpcionRespuestaModule,
  ],
  controllers: [EncuestaController],
  providers: [EncuestaService],
>>>>>>> a557459f475bafc841c466586223954d86a68ff3
})
export class AppModule {}
