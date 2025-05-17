import { PartialType } from '@nestjs/swagger';
import { CreateEncuestaDTO } from './create-encuesta.dto';

export class UpdateEncuestaDto extends PartialType(CreateEncuestaDTO) {}
