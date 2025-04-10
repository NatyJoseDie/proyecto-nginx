import { IsNumber, IsArray, IsOptional, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRespuestaDto {
  @IsNumber()
  encuestaId: number;

  @IsOptional()
  @IsArray()
  respuestasAbiertas?: { preguntaId: number; texto: string }[];

  @IsOptional()
  @IsArray()
  respuestasOpciones?: { preguntaId: number; opcionId: number }[];
}