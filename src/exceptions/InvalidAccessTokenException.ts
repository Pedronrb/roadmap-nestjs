import { HttpStatus } from '@nestjs/common';
import { AppException, AppExceptionProps } from './app-exception';

export class InvalidAccessTokenException extends AppException {
  constructor() {
    super({
      message: 'Access token inválido ou expirado',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}