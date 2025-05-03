import { BadRequestException, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { GetNivelYearFromHeader } from '../util/headerExtractor';
import { assert } from '../util/assert';
import { signToken, verifyToken } from '../util/jwt';
import { UserService } from '../modules/User/user.service';

//in this app / every request header must contain nivel and year
export class ExtractNivelYearFromHeaders implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    const { nivel, year } = GetNivelYearFromHeader(req);
    req.nivel = nivel;
    req.year = year;
    return next();
  }
}
export class VerifyCredentials implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: any, res: any, next: (error?: Error | any) => void) {
    const token = req.get('Token');

    const nivel = req.nivel;

    assert(token != undefined, 'token inválido');
    const userID = verifyToken(token);
    const user = await this.userService.findById(userID, nivel);

    if (!user) {
      throw new BadRequestException('invalid username or password');
    }
    req.body.issuer = userID;
    const refreshedToken = signToken({ _id: userID });
    res.setHeader('Token', refreshedToken);
    return next();
  }
}
