import { Column } from 'typeorm';

export class Multimedia {
  @Column()
  url: string;

  @Column()
  tipo: string;
}