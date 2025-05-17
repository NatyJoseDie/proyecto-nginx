import { ApiProperty } from '@nestjs/swagger';
import { IdDTO } from './id.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRespuestaOpcionDTO {
  @ApiProperty({ type: () => IdDTO })
  @ValidateNested()
  @Type(() => IdDTO)
  opcion: IdDTO;
}
