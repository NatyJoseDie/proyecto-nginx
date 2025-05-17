<<<<<<< HEAD
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
=======
>>>>>>> leandro
import { Encuesta } from './encuesta.entity';
import { Exclude } from 'class-transformer';
import { Opcion } from './opcion.entity';
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RespuestaAbierta } from './respuesta-abierta.entity';

@Entity({ name: 'preguntas' })
export class Pregunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  texto: string;

  @Column({ type: 'enum', enum: TiposRespuestaEnum })
  tipo: TiposRespuestaEnum;

<<<<<<< HEAD
  @ManyToOne(() => Encuesta, (encuesta) => encuesta.preguntas)
  @JoinColumn({ name: 'id_encuesta' })
=======
  @ManyToOne(() => Encuesta)
  @JoinColumn({ name: 'id_encuesta' })
  @Exclude()
>>>>>>> leandro
  encuesta: Encuesta;

  @OneToMany(() => Opcion, (opcion) => opcion.pregunta, {
    cascade: ['insert'],
  })
  opciones: Opcion[];

  @OneToMany(
    () => RespuestaAbierta,
    (respuestaAbierta) => respuestaAbierta.pregunta,
  )
  respuestas: RespuestaAbierta[];
}
