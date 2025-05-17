import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Pregunta } from './pregunta.entity';
import { Exclude } from 'class-transformer';
import { Respuesta } from './respuesta.entity';

@Entity({ name: 'encuestas' })
export class Encuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
  @Column({ default: true })
  activa: boolean;

  @Column({ name: 'codigo_respuesta', type: 'varchar', nullable: false })
  codigoRespuesta: string;

  @Column({ name: 'codigo_resultados', type: 'varchar', nullable: false })
  codigoResultados: string;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, { cascade: true })
  preguntas: Pregunta[];

  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, { cascade: true })
  @OneToMany(() => Respuesta, (respuesta) => respuesta.encuesta)
  respuestas: Respuesta[];
}
