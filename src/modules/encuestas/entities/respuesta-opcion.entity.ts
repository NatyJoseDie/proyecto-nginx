import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Opcion } from './opcion.entity';
import { Respuesta } from './respuesta.entity';

@Entity('respuestas_opciones')
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasOpciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;

  @ManyToOne(() => Opcion, (opcion) => opcion.respuestasOpciones, {
    eager: true,
  })
  @JoinColumn({ name: 'id_opcion' })
  opcion: Opcion;
}
