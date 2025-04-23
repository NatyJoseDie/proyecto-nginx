import { TipoRespuesta } from '../../enums/tipo-respuesta.enum';

export class CreatePreguntaDto {
  numero: number;
  texto: string;
  encuestaId: number;
  tipoRespuesta: TipoRespuesta;

  // campos opcionales
  urlVideo?: string;
  descripcionVideo?: string;
  subtitulosVideo?: string;
  transcripcionVideo?: string;
  urlImagen?: string;
  descripcionImagen?: string;
  urlAudio?: string;
  descripcionAudio?: string;
  audioInstrucciones?: string;
  permitirRespuestaVoz?: boolean;
  audioAyuda?: string;
  urlRecursosAdicionales?: string;
  documentosPDF?: string;
  permitirDibujo?: boolean;
  permitirGrabacionVideo?: boolean;
  iconosAyuda?: string;
  ejemplosVisuales?: string;

  // opciones para preguntas cerradas
  opciones?: { texto: string }[];
}
