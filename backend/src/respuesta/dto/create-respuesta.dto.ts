import {
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRespuestaDto {
  encuestaId: number;
}
