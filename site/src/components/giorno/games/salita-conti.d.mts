// Dichiarazioni di salita-conti.mjs, per `astro check` e per salita.ts.
export type Tono = 'alto' | 'medio' | 'ombra';
export interface Faccia {
  nome: string;
  n: [number, number, number];
  punti: number;
}
export interface Fermata {
  rx: number;
  rz: number;
}
export const ASCESE: number;
export const MOSTRATE: number;
export const RIPOSO: { centro: number; fusto: number; q: number; p: number; cielo: number; ascesa: number };
export const SOSTA: number;
export const BASE: number;
export const VISTA: { x: number; y: number };
export const FACCE: Faccia[];
export const FERMATE: Fermata[];
export function stringi(v: number, a?: number, b?: number): number;
export function liscia(t: number): number;
export function avanzamento(cima: number, altezza: number, vista: number): number;
export function cifra(v: number): string;
export function normale(n: number[], rx: number, rz: number): number[];
export function facciaInAlto(rx: number, rz: number): { punti: number; dritta: number };
export function toni(rx: number, rz: number): Tono[];
export function versoChiGuarda(n: number[], rx: number, rz: number): number;
export function tappa(cime: number[], linea: number): number;
export function dadoAllaTappa(s: number): { rx: number; rz: number; su: number; fermo: boolean };
export function quotaBassa(p: number, torre: number, palco: number, segmento: number): number;
export function soglia(i: number): number;
export function accensione(q: number, i: number): number;
export function ascesa(q: number, palco: number, segmento: number, tratti: number): number;
