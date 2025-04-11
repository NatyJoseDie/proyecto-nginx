import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsArray,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { TipoRespuesta } from '../../enums/tipo-respuesta.enum';

import { Type } from 'class-transformer';

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
  @IsString()
  urlVideo?: string;

  @IsOptional()
  @IsString()
  urlAudio?: string;

  @IsOptional()
  @IsArray()
  opciones?: string[];
}
