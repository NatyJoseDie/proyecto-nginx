export class PreguntaDto {
  id: number;
  numero: number;
  texto: string;
  tipo: string;
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
