import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Encuesta } from './encuesta.entity';
import { RespuestaAbierta } from './respuesta-abierta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', default: () => 'gen_random_uuid()', unique: true })
  codigoAcceso: string;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.respuestas, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_encuesta' })
  encuesta: Encuesta;

  @OneToMany(
    () => RespuestaAbierta,
    (respuestaAbierta) => respuestaAbierta.respuesta,
    { onDelete: 'CASCADE' },
  )
  respuestasAbiertas: RespuestaAbierta[];

  @OneToMany(
    () => RespuestaOpcion,
    (respuestaOpcion) => respuestaOpcion.respuesta,
    { onDelete: 'CASCADE' },
  )
  respuestasOpciones: RespuestaOpcion[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;
}
