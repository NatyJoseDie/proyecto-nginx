import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { ConfiguracionAccesibilidad } from './configuracion-accesibilidad.entity';
import { Respuesta } from './respuesta.entity';

@Entity('encuestas')
export class Encuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ name: 'codigo_respuesta', type: 'varchar', nullable: false })
  codigoRespuesta: string;

  @Column({ name: 'codigo_resultados', type: 'varchar', nullable: false })
  codigoResultados: string;

  @OneToMany(() => Pregunta, pregunta => pregunta.encuesta, { cascade: true })
  preguntas: Pregunta[];

  @OneToMany(() => Respuesta, respuesta => respuesta.encuesta, { cascade: true })
  respuestas: Respuesta[];

  @OneToOne(() => ConfiguracionAccesibilidad, config => config.encuesta, { cascade: true })
  configuracionAccesibilidad: ConfiguracionAccesibilidad;
}