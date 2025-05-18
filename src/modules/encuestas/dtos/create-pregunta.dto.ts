import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';
import { CreateOpcionDTO } from './create-opcion.dto';
import { Type } from 'class-transformer';

export class CreatePreguntaDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  numero: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  texto: string;

  @ApiProperty({ enum: TiposRespuestaEnum })
  @IsEnum(TiposRespuestaEnum)
  @IsNotEmpty()
  tipo: TiposRespuestaEnum;

  @ApiProperty({ type: [CreateOpcionDTO], required: false })
  @ValidateIf((obj) => {
    console.log('obj', obj);
    return (
      obj.tipo === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE ||
      obj.tipo === TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE
    );
  })
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreateOpcionDTO)
  opciones?: CreateOpcionDTO[];
}
