import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Encuesta } from './encuesta.entity';

@Entity('configuracion_accesibilidad')
export class ConfiguracionAccesibilidad {
  @PrimaryGeneratedColumn()
  id: number;

  // Configuración Visual
  @Column({ type: 'boolean', default: true })
  permitirAjusteTamanioFuente: boolean;

  @Column({ type: 'boolean', default: true })
  permitirAjusteContraste: boolean;

  @Column({ type: 'boolean', default: true })
  modoAltoContraste: boolean;

  // Configuración Auditiva
  @Column({ type: 'boolean', default: true })
  lecturaAutomatica: boolean;

  @Column({ type: 'varchar', nullable: true })
  velocidadLectura: string;

  // Configuración de Navegación
  @Column({ type: 'boolean', default: true })
  navegacionTeclado: boolean;

  @Column({ type: 'boolean', default: true })
  comandosVoz: boolean;

  // Asistencia
  @Column({ type: 'boolean', default: true })
  ayudaContextual: boolean;

  @Column({ type: 'varchar', nullable: true })
  idiomaPreferido: string;

  @OneToOne(() => Encuesta, encuesta => encuesta.configuracionAccesibilidad)
  @JoinColumn()
  encuesta: Encuesta;
}