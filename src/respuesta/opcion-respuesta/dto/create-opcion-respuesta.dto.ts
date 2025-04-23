import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOpcionRespuestaDto {
  @IsNotEmpty()
  @IsNumber()
  respuestaId: number;

  @IsNotEmpty()
  @IsNumber()
  opcionId: number;
}
