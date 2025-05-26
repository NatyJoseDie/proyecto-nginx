import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Opcion } from 'src/modules/encuestas/entities/opcion.entity';
import { Pregunta } from 'src/modules/encuestas/entities/pregunta.entity';
import { TiposRespuestaEnum } from 'src/modules/encuestas/enums/tipos-respuesta.enum';

import { Repository } from 'typeorm';

@Injectable()
export class ValidateAnswerInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const http: Request = context.switchToHttp().getRequest();
    const params = http.params;
    const body: Record<string, any> = http.body as Record<string, any>;
    const { idEncuesta, idPregunta } = params;
    const pregunta = await this.preguntaRepository.findOne({
      where: { id: Number(idPregunta), encuesta: { id: Number(idEncuesta) } },
    });
    if (!pregunta) {
      throw new HttpException('No se encontro pregunta', HttpStatus.NOT_FOUND);
    }
    if (pregunta.tipo === TiposRespuestaEnum.ABIERTA) {
      return next.handle();
    }
    if (!pregunta.opciones.some((el: Opcion) => el.texto === body.texto)) {
      throw new HttpException(
        'Opcion seleccionada no valida',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return next.handle();
  }
}
