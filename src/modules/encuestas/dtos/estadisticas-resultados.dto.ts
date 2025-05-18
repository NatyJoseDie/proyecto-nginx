class OpcionDto {
  id: number;
  texto: string;
  numero: number;
}

class RespuestaOpcionDto {
  id: number;
  opcionId: number;
  cantidad: number;
}

class RespuestaAbiertaDto {
  id: number;
  texto: string;
}

class PreguntaDto {
  id: number;
  numero: number;
  texto: string;
  tipo: string;
  opciones: OpcionDto[];
  respuestasOpciones: RespuestaOpcionDto[];
  respuestasAbiertas: RespuestaAbiertaDto[];
}

export class EstadisticasDto {
  id: number;
  nombre: string;
  preguntas: PreguntaDto[];
  codigoRespuesta: string;
}
