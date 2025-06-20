import { Module } from '@nestjs/common';
import { EncuestasController } from './controllers/encuestas.controller';
import { EncuestasService } from './services/encuestas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { Pregunta } from './entities/pregunta.entity';
import { Opcion } from './entities/opcion.entity';
import { Respuesta } from './entities/respuesta.entity';
import { RespuestaAbierta } from './entities/respuesta-abierta.entity';
import { RespuestaOpcion } from './entities/respuesta-opcion.entity';
import { RespuestaVerdaderoFalso } from './entities/respuesta-verdadero-falso.entity';
import { RespuestasController } from './controllers/respuestas.controller';
import { RespuestasService } from './services/respuestas.service';
import { NubePalabrasService } from './services/nube-palabras.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Encuesta,
      Pregunta,
      Opcion,
      Respuesta,
      RespuestaAbierta,
      RespuestaOpcion,
      RespuestaVerdaderoFalso, // <-- agregada
    ]),
  ],
  controllers: [EncuestasController, RespuestasController],
  //definen los métdos que manejan las solicitudes a determionadas rutas
  providers: [EncuestasService, RespuestasService, NubePalabrasService],
  //objetos de una clase que el framework va a dejar disponible para que se pueda inyectar
  // imports: []
})
export class EncuestasModule {}
