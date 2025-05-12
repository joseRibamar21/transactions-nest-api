import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JsonOnlyMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (req.headers['content-type'] !== 'application/json') {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
          message: 'Content-Type not supported. Only application/json is allowed.',
          error: 'Unsupported Media Type',
        },
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
    next();
  }
}