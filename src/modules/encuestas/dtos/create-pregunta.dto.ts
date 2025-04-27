import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { TipoRespuesta } from '../enums/tipo-respuesta.enum';

export class CreatePreguntaDto {
  @IsNumber()
  @IsNotEmpty()
  numero: number;

  @IsString()
  @IsNotEmpty()
  texto: string;

  @IsEnum(TipoRespuesta)
  tipoRespuesta: TipoRespuesta;

  @IsOptional()
  @IsBoolean()
  seleccionMultiple?: boolean;

  @IsOptional()
  @IsArray()
  opciones?: string[];
}
