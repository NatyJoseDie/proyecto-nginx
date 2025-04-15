import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity'; // Changed from interface to entity

@Entity('opciones')
export class Opcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  texto: string;

  @Column({ type: 'int', nullable: false })
  numero: number;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.opciones)
  pregunta: Pregunta;

  @OneToMany(() => RespuestaOpcion, (respuestaOpcion) => respuestaOpcion.opcion)
  respuestasOpciones: RespuestaOpcion[];
}
