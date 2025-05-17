import { PartialType } from '@nestjs/swagger';
import { CreatePreguntaDTO } from './create-pregunta.dto';

export class UpdatePreguntaDTO extends PartialType(CreatePreguntaDTO) {}
