import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { assert } from '../util/asserts';

export class Cors implements NestMiddleware {
  constructor(private config: ConfigService) {}
  use(req: any, res: any, next: (error?: Error | any) => void) {
    const origin = req.get('origin') || req.origin;
    assert(origin, 'invalid origin');
    const allowed_origins = (process.env.ALLOWED_ORIGINS || this.config.get('ALLOWED_ORIGINS') || '').split('-');

    const request_method = req.method;

    if (allowed_origins.some((element) => element === origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', ['PUT', 'POST', 'DELETE', 'GET', 'PATCH', 'OPTIONS']);
      res.setHeader('Access-Control-Allow-Headers', [
        'Year',
        'Nivel',
        'Token',
        'Content-Type',
        'Content-Length',

        'Accept',
        'Authentication',
        'File-Size',
        'Accept-Encoding',
        'Accept-Language',
      ]);
      res.setHeader('Access-Control-Expose-Headers', ['Token']);
      res.setHeader('Access-Control-Allow-credentials', 'include');
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
    }
    return next();
  }
}
