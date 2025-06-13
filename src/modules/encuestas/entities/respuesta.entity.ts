import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Encuesta } from './encuesta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity';
import { RespuestaAbierta } from './respuesta-abierta.entity';
import { RespuestaVerdaderoFalso } from './respuesta-verdadero-falso.entity';

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
    },
  )
  respuestasOpciones: RespuestaOpcion[];

  @OneToMany(
    () => RespuestaAbierta,
    (respuestaAbierta) => respuestaAbierta.respuesta,
    {
      cascade: ['insert'],
    },
  )
  respuestasAbiertas: RespuestaAbierta[];

  @OneToMany(
    () => RespuestaVerdaderoFalso,
    (r) => r.respuesta,
    {
      cascade: ['insert'],
    },
  )
  respuestasVerdaderoFalso: RespuestaVerdaderoFalso[];
}
