import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Pregunta } from './pregunta.entity';

@Entity({ name: 'respuestas_verdadero_falso' })
export class RespuestaVerdaderoFalso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasVerdaderoFalso, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;

  @ManyToOne(() => Pregunta, { eager: true })
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;

  @Column({ type: 'boolean' })
  valor: boolean;
}