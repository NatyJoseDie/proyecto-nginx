import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { EncuestasModule } from './modules/encuestas/encuestas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from './modules/encuestas/entities/encuesta.entity';
import { Pregunta } from './modules/encuestas/entities/pregunta.entity';
import { Opcion } from './modules/encuestas/entities/opcion.entity';
import { Respuesta } from './modules/encuestas/entities/respuesta.entity';
import { RespuestaOpcion } from './modules/encuestas/entities/respuesta-opcion.entity';
import { RespuestaAbierta } from './modules/encuestas/entities/respuesta-abierta.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    CloudinaryModule,
    EncuestasModule,
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
        entities: [
          Encuesta,
          Pregunta,
          Opcion,
          Respuesta,
          RespuestaOpcion,
          RespuestaAbierta,
        ],
        // Esto puede modificar la BD sin consultar, se cambió a false
        synchronize: true, // Cambiado a true para desarrollo
        autoLoadEntities: true,
        logging: configService.get('database.logging'),
        logger: configService.get('database.logger'),
      }),
    }),
  ],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class AppModule {}
