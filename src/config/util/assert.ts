import { BadRequestException } from '@nestjs/common';
import { VALID_YEARS, VALID_NIVELES, VALID_GRADOS, VALID_SECCIONES } from '../var/colegio';

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function assertYear(year: any): asserts year is Year {
  if (VALID_YEARS.includes(year)) return year;
  else throw new BadRequestException('año inválido');
}

export function assertNivel(nivel: any): asserts nivel is Nivel {
  if (VALID_NIVELES.includes(nivel)) return;
  else throw new BadRequestException('nivel inválido');
}

export function assertGrado(grado: any): asserts grado is Grado {
  if (VALID_GRADOS.includes(grado)) return;
  else throw new BadRequestException('grado inválido');
}

export function assertSeccion(seccion: any): asserts seccion is Seccion {
  if (VALID_SECCIONES.includes(seccion)) return;
  else throw new BadRequestException('sección inválida');
}
