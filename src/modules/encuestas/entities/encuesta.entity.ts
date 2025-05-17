import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, { cascade: true })
  @OneToMany(() => Respuesta, (respuesta) => respuesta.encuesta)
  respuestas: Respuesta[];

  @Column({ name: 'codigo_respuesta' })
  codigoRespuesta: string;

  @Column({ name: 'codigo_resultados' })
  @Exclude()
  codigoResultados: string;
}
