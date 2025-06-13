// src/modules/encuestas/dtos/create-respuesta-verdadero-falso.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PreguntaIdDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class CreateRespuestaVerdaderoFalsoDTO {
  @ApiProperty({ type: PreguntaIdDTO })
  @ValidateNested()
  @Type(() => PreguntaIdDTO)
  pregunta: PreguntaIdDTO;

  @ApiProperty()
  @IsBoolean()
  valor: boolean;
}
