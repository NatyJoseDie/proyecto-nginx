import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRespuestaAbiertaDTO } from './create-respuesta-abierta.dto';
import { CreateRespuestaOpcionDTO } from './create-respuesta-opcion.dto';

export class CreateRespuestaDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  texto: string;
  // @ApiProperty({ type: [CreateRespuestaAbiertaDTO] })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateRespuestaAbiertaDTO)
  // respuestasAbiertas: CreateRespuestaAbiertaDTO[];

  // @ApiProperty({ type: [CreateRespuestaOpcionDTO] })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateRespuestaOpcionDTO)
  // respuestasOpciones: CreateRespuestaOpcionDTO[];
}
