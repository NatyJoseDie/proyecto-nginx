import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Encuesta } from './encuesta.entity';
import { Opcion } from './opcion.entity';
import { RespuestaAbierta } from './respuesta-abierta.entity';
import { TipoRespuesta } from '../enums/tipo-respuesta.enum';

@Entity('preguntas')
export class Pregunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  numero: number;

  @Column({ type: 'varchar', nullable: false })
  texto: string;

  @Column({
    type: 'enum',
    enum: TipoRespuesta,
    default: TipoRespuesta.ABIERTA,
  })
  tipoRespuesta: TipoRespuesta;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.preguntas)
  @JoinColumn({ name: 'id_encuesta' })
  encuesta: Encuesta;

  @OneToMany(
    () => RespuestaAbierta,
    (respuestaAbierta) => respuestaAbierta.pregunta,
    { cascade: true },
  )
  respuestasAbiertas: RespuestaAbierta[];

  @OneToMany(() => Opcion, (opcion) => opcion.pregunta, { cascade: true })
  opciones: Opcion[];
}
