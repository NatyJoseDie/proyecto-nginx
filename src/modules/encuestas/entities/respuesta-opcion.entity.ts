import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Opcion } from './opcion.entity';
import { Respuesta } from './respuesta.entity';

@Entity('respuestas_opciones')
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasOpciones, {
    onDelete: 'CASCADE',
  })
  respuesta: Respuesta;

  @ManyToOne(() => Opcion, (opcion) => opcion.respuestasOpciones, {
    eager: true,
  })
  opcion: Opcion;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  tiempoRespuesta: Date;

  @Column({ type: 'varchar', nullable: true })
  metodoSeleccion: string;

  @Column({ type: 'boolean', default: false })
  requirioAsistencia: boolean;
}
