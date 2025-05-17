import {
<<<<<<< HEAD
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
=======
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
>>>>>>> leandro
import { Pregunta } from './pregunta.entity';
import { Respuesta } from './respuesta.entity';

@Entity({ name: 'respuestas_abiertas' })
export class RespuestaAbierta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

<<<<<<< HEAD
  @ManyToOne(() => Pregunta, (pregunta) => pregunta.respuestasAbiertas)
  @JoinColumn({ name: 'id_pregunta' })
=======
  @ManyToOne(() => Pregunta)
  @JoinColumn({ name: 'id_pregunta' })
  @Exclude()
>>>>>>> leandro
  pregunta: Pregunta;

  @Expose()
  get preguntaId(): number {
    return this.pregunta?.id;
  }

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasAbiertas)
  @JoinColumn({ name: 'id_respuesta' })
<<<<<<< HEAD
=======
  @Exclude()
>>>>>>> leandro
  respuesta: Respuesta;
}
