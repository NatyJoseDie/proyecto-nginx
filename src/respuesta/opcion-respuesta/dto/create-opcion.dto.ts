import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOpcionDto {
  @IsNotEmpty()
  @IsString()
  texto: string;

  @IsNotEmpty()
  @IsNumber()
  numero: number;

  @IsNotEmpty()
  @IsNumber()
  preguntaId: number;
}
