import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

/*
 *this interceptor is meant to set token header after the registration
 *process is done successfuly, a token must be returned by the controller
 ALSO: THIS process is not meant to be used to refresh the token, since that 
 job is done by the verify credenctials middleware
 */

export class SetTokenHeader implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((token: string) => {
        const response = context.switchToHttp().getResponse();
        response.set('Token', token);
        return 'successfully registered';
      }),
    );
  }
}
