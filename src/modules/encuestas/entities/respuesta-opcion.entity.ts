<<<<<<< HEAD
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
=======
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

>>>>>>> leandro
import { Opcion } from './opcion.entity';
import { Respuesta } from './respuesta.entity';

@Entity({ name: 'respuestas_opciones' })
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
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
=======
  @ManyToOne(() => Opcion)
  @JoinColumn({ name: 'id_opcion' })
  @Exclude()
  opcion: Opcion;

  @Expose()
  get opcionId(): number {
    return this.opcion?.id;
  }

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasOpciones)
  @JoinColumn({ name: 'id_respuesta' })
  @Exclude()
  respuesta: Respuesta;
>>>>>>> leandro
}
