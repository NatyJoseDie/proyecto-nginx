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

class RespuestasDto {
  preguntaId: number;
  textoRespuesta: string[];
}

class RespuestaEncuestadoDto {
  id: number;
  respuestas: RespuestasDto[];
}

export class ResultadosDto {
  id: number;
  nombre: string;
  preguntas: PreguntaDto[];
  respuestas: RespuestaEncuestadoDto[];
  codigoRespuesta: string;
}
