<<<<<<< HEAD
<<<<<<< HEAD
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
=======
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
>>>>>>> leandro
=======
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

>>>>>>> dev
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

<<<<<<< HEAD
  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, {
    cascade: ['insert'],
  })

=======
  @Column({ name: 'codigo_respuesta', type: 'varchar', nullable: false })
  codigoRespuesta: string;

  @Column({ name: 'codigo_resultados', type: 'varchar', nullable: false })
  codigoResultados: string;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, { cascade: true })
>>>>>>> dev
  preguntas: Pregunta[];

  @OneToMany(() => Respuesta, (respuesta) => respuesta.encuesta)
  respuestas: Respuesta[];
}
