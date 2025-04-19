import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Opcion } from './opcion.entity';

@Entity('respuestas_opciones')
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasOpciones, { onDelete: 'CASCADE' })
  respuesta: Respuesta;

  @ManyToOne(() => Opcion, (opcion) => opcion.respuestasOpciones, { eager: true })
  opcion: Opcion;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRespuesta: Date;

  // Puedes agregar más campos si lo necesitas, como usuarioId, etc.
}
