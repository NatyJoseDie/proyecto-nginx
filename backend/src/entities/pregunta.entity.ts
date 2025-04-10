import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
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

  // Contenido de Video
  @Column({ type: 'varchar', nullable: true })
  urlVideo: string;

  @Column({ type: 'varchar', nullable: true })
  descripcionVideo: string;

  @Column({ type: 'varchar', nullable: true })
  subtitulosVideo: string;

  @Column({ type: 'varchar', nullable: true })
  transcripcionVideo: string;

  // Contenido de Imagen
  @Column({ type: 'varchar', nullable: true })
  urlImagen: string;

  @Column({ type: 'varchar', nullable: true })
  descripcionImagen: string;

  // Recursos Adicionales
  @Column({ type: 'varchar', nullable: true })
  urlAudio: string;  // Audio de la pregunta

  @Column({ type: 'varchar', nullable: true })
  descripcionAudio: string;  // Descripción del contenido del audio

  @Column({ type: 'varchar', nullable: true })
  audioInstrucciones: string;  // Instrucciones en audio

  @Column({ type: 'boolean', default: true })
  permitirRespuestaVoz: boolean;  // Permitir responder por voz

  @Column({ type: 'varchar', nullable: true })
  audioAyuda: string;  // Audio con ayuda adicional

  @Column({ type: 'varchar', nullable: true })
  urlRecursosAdicionales: string;

  @Column({ type: 'varchar', nullable: true })
  documentosPDF: string;

  // Opciones de Interactividad
  @Column({ type: 'boolean', default: false })
  permitirDibujo: boolean;

  @Column({ type: 'boolean', default: false })
  permitirGrabacionVideo: boolean;

  // Ayudas Visuales
  @Column({ type: 'varchar', nullable: true })
  iconosAyuda: string;

  @Column({ type: 'varchar', nullable: true })
  ejemplosVisuales: string;

  // Campos Originales
  @Column({ 
    type: 'enum', 
    enum: TipoRespuesta, 
    default: TipoRespuesta.ABIERTA 
  })
  tipoRespuesta: TipoRespuesta;

  @ManyToOne(() => Encuesta, encuesta => encuesta.preguntas)
  encuesta: Encuesta;

  @OneToMany(() => RespuestaAbierta, respuestaAbierta => respuestaAbierta.pregunta, { cascade: true })
  respuestasAbiertas: RespuestaAbierta[];

  @OneToMany(() => Opcion, opcion => opcion.pregunta, { cascade: true })
  opciones: Opcion[];
}