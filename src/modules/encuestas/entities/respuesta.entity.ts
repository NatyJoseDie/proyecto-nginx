import {
  Entity,
<<<<<<< HEAD
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
=======
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
>>>>>>> leandro
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Encuesta } from './encuesta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity';
import { RespuestaAbierta } from './respuesta-abierta.entity';

@Entity({ name: 'respuestas' })
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
  @ManyToOne(() => Encuesta, (encuesta) => encuesta.respuestas, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_encuesta' })
=======
  @ManyToOne(() => Encuesta)
  @JoinColumn({ name: 'id_encuesta' })
  @Exclude()
>>>>>>> leandro
  encuesta: Encuesta;

  @OneToMany(
    () => RespuestaOpcion,
    (respuestaOpcion) => respuestaOpcion.respuesta,
    {
      cascade: ['insert'],
    },
  )
  respuestasOpciones: RespuestaOpcion[];
<<<<<<< HEAD
=======

  @OneToMany(
    () => RespuestaAbierta,
    (respuestaAbierta) => respuestaAbierta.respuesta,
    {
      cascade: ['insert'],
    },
  )
  respuestasAbiertas: RespuestaAbierta[];
>>>>>>> leandro
}
