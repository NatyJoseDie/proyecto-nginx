import { PalabraFrecuenciaDto } from './palabra-frecuencia.dto';

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

class RespuestaVFDto {
  id: number;
  valor: boolean;
  cantidad: number;
}

export class PreguntaDto {
  id: number;
  numero: number;
  texto: string;
  tipo: string;
  opciones: OpcionDto[];
  respuestasOpciones: RespuestaOpcionDto[];
  respuestasAbiertas: RespuestaAbiertaDto[];
  respuestasVF: RespuestaVFDto[];
  frecuenciaPalabras: PalabraFrecuenciaDto[];
}

export class ResultadosGraficosDto {
  id: number;
  nombre: string;
  preguntas: PreguntaDto[];
  codigoRespuesta: string;
  activa: boolean;
}
