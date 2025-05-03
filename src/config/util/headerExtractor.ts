import { BadRequestException } from '@nestjs/common';
import { assert } from 'console';
import { Request } from 'express';
import { assertNivel, assertYear } from './assert';
export function GetNivelYearFromHeader(request: Request): {
  nivel: Nivel;
  year: Year;
} {
  const nivel: string | undefined = request.get('nivel');
  const year: number | undefined = +request.get('year');
  assertNivel(nivel);
  assertYear(year);

  return { nivel, year };
}
