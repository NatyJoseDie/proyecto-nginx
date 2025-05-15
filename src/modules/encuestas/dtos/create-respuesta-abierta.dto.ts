import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IdDTO } from './id.dto';

export class CreateRespuestaAbiertaDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  texto: string;

  @ApiProperty({ type: () => IdDTO })
  @ValidateNested()
  @Type(() => IdDTO)
  pregunta: IdDTO;
}
