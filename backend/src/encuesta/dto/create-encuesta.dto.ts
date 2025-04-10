import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEncuestaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}