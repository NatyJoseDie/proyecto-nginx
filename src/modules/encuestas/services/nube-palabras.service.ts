import { Injectable } from '@nestjs/common';
import * as sw from 'stopword';
import { WordTokenizer } from 'natural';
import { PalabraFrecuenciaDto } from '../dtos/palabra-frecuencia.dto';

const filtroPalabras = [
  'o',
  'el',
  'la',
  'los',
  'las',
  'lo',
  'y',
  'a',
  'de',
  'en',
  'que',
  'se',
  'es',
  'me',
  'te',
  'le',
  'les',
  'son',
  'hay',
];

@Injectable()
export class NubePalabrasService {
  private tokenize(texto: string): string[] {
    return texto.toLowerCase().match(/[a-záéíóúüñ]+/gi) || [];
  }

  generarNubePalabras(textos: string[]): PalabraFrecuenciaDto[] {
    const palabras = textos.flatMap((texto) => this.tokenize(texto));
    const palabrasFiltradas = sw.removeStopwords(palabras, [
      ...sw.spa,
      ...filtroPalabras,
    ]);

    const mapaDeFrecuencia = new Map<string, number>();
    for (const text of palabrasFiltradas) {
      mapaDeFrecuencia.set(text, (mapaDeFrecuencia.get(text) || 0) + 1);
    }
    return Array.from(mapaDeFrecuencia.entries()).map(([text, weight]) => ({
      text,
      weight,
    }));
  }
}
