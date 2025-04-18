import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { Respuesta } from './respuesta.entity';

@Entity('respuestas_abiertas')
export class RespuestaAbierta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  texto: string;

  @Column({ type: 'varchar', nullable: true })
  audioRespuesta: string;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.respuestasAbiertas)
  pregunta: Pregunta;

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasAbiertas)
  respuesta: Respuesta;
}
