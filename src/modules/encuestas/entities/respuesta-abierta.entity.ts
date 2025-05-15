import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { Respuesta } from './respuesta.entity';

@Entity('respuestas_abiertas')
export class RespuestaAbierta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  texto: string;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.respuestasAbiertas)
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasAbiertas)
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;
}
