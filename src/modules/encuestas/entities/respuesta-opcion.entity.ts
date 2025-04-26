import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Opcion } from './opcion.entity';
import { Respuesta } from './respuesta.entity';

@Entity('respuestas_opciones')
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

<<<<<<<< HEAD:src/modules/encuestas/entities/respuesta-opcion.entity.ts
  @ManyToOne(() => Opcion, (opcion) => opcion.respuestasOpciones)
========
  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasOpciones, {
    onDelete: 'CASCADE',
  })
  respuesta: Respuesta;

  @ManyToOne(() => Opcion, (opcion) => opcion.respuestasOpciones, {
    eager: true,
  })
>>>>>>>> a557459f475bafc841c466586223954d86a68ff3:src/entities/respuesta-opcion.entity.ts
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
