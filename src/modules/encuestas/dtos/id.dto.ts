import { IsNotEmpty, IsNumber } from 'class-validator';

export class IdDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
