import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRespuestaAbiertaDTO } from './create-respuesta-abierta.dto';
import { CreateRespuestaOpcionDTO } from './create-respuesta-opcion.dto';
import { CreateRespuestaVerdaderoFalsoDTO } from './create-respuesta-verdadero-falso.dto';


export class CreateRespuestaDTO {
  @ApiProperty({ type: [CreateRespuestaAbiertaDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRespuestaAbiertaDTO)
  respuestasAbiertas: CreateRespuestaAbiertaDTO[];

  @ApiProperty({ type: [CreateRespuestaOpcionDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRespuestaOpcionDTO)
  respuestasOpciones: CreateRespuestaOpcionDTO[];

  @ApiProperty({ type: [CreateRespuestaVerdaderoFalsoDTO], required: false }) // opcional
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRespuestaVerdaderoFalsoDTO)
  respuestasVerdaderoFalso?: CreateRespuestaVerdaderoFalsoDTO[];
}
