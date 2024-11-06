import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async singIn(@Request() request: any) {
    return request.user;
  }
}
