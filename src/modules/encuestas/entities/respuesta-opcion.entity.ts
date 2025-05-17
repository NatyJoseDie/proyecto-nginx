import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { Opcion } from './opcion.entity';
import { Respuesta } from './respuesta.entity';

@Entity({ name: 'respuestas_opciones' })
export class RespuestaOpcion {
  @PrimaryGeneratedColumn()
  id: number;

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
}
