import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { CodigoDTO } from "../dtos/obtener-resultados-dto";

export const CodigoDTODecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest()
    const codigo = req.query.codigo
    const codigoDTO = new CodigoDTO()
    Object.assign(codigoDTO, { codigo })
    return codigoDTO
  }
);
