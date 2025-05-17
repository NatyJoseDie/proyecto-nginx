import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

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

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.opciones)
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;

  @OneToMany(() => RespuestaOpcion, (respuestaOpcion) => respuestaOpcion.opcion)
  @Exclude()
  respuestasOpciones: RespuestaOpcion[];
}
