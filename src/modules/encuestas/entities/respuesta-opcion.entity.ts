import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Opcion } from './opcion.entity';
import { Respuesta } from './respuesta.entity';

@Entity('respuestas_opciones')
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Opcion, (opcion) => opcion.respuestasOpciones)
  opcion: Opcion;

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasOpciones)
  respuesta: Respuesta;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  tiempoRespuesta: Date;

  @Column({ type: 'varchar', nullable: true })
  metodoSeleccion: string;

  @Column({ type: 'boolean', default: false })
  requirioAsistencia: boolean;
}
