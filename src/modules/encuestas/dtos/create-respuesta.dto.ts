import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRespuestaDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  texto: string;
}
