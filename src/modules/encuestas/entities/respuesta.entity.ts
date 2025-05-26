import {
  AfterLoad,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Encuesta } from './encuesta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity';
import { RespuestaAbierta } from './respuesta-abierta.entity';

@Entity({ name: 'respuestas' })
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.respuestas, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_encuesta' })
  encuesta: Encuesta;

  @OneToMany(
    () => RespuestaOpcion,
    (respuestaOpcion) => respuestaOpcion.respuesta,
    {
      cascade: ['insert'],
      eager: true,
    },
  )
  respuestasOpciones: RespuestaOpcion[];

  @OneToMany(
    () => RespuestaAbierta,
    (respuestaAbierta) => respuestaAbierta.respuesta,
    {
      cascade: ['insert'],
      eager: true,
    },
  )
  respuestasAbiertas: RespuestaAbierta[];
}
