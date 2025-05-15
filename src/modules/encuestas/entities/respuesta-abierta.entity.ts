import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Pregunta } from './pregunta.entity';
import { Respuesta } from './respuesta.entity';

@Entity({ name: 'respuestas_abiertas' })
export class RespuestaAbierta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @ManyToOne(() => Pregunta)
  @JoinColumn({ name: 'id_pregunta' })
  @Exclude()
  pregunta: Pregunta;

  @Expose()
  get preguntaId(): number {
    return this.pregunta?.id;
  }

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasAbiertas)
  @JoinColumn({ name: 'id_respuesta' })
  @Exclude()
  respuesta: Respuesta;
}
