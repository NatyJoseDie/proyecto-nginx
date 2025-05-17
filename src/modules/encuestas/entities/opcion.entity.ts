import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
<<<<<<< HEAD
  JoinColumn,
=======
  PrimaryGeneratedColumn,
>>>>>>> leandro
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Pregunta } from './pregunta.entity';
import { RespuestaOpcion } from './respuesta-opcion.entity';

@Entity({ name: 'opciones' })
export class Opcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @Column()
  numero: number;

<<<<<<< HEAD
  @ManyToOne(() => Pregunta, (pregunta) => pregunta.opciones)
  @JoinColumn({ name: 'id_pregunta' })
=======
  @ManyToOne(() => Pregunta)
  @JoinColumn({ name: 'id_pregunta' })
  @Exclude()
>>>>>>> leandro
  pregunta: Pregunta;

  @OneToMany(() => RespuestaOpcion, (respuestaOpcion) => respuestaOpcion.opcion)
  @Exclude()
  respuestasOpciones: RespuestaOpcion[];
}
