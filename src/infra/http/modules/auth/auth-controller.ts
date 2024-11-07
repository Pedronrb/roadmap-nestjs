import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthRequestModel } from './models/auth-request-models';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signin-use-case';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { Public } from './guards/decorators/is-public';
import { AuthenticatedRequestModel } from './models/authenticated-request-model';


@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase){}

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async singIn(@Request() request: AuthRequestModel) {
    const acess_token = await this.signInUseCase.execute({
      user: request.user,
    })
    
    return acess_token;
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async test(@Request() request: AuthenticatedRequestModel){
    return request.user;
  }
}
