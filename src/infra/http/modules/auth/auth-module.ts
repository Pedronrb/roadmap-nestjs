import { Controller, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth-controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local-strategy';

import { UserModule } from '../user/user-module';
import { ValidateUserUseCase } from 'src/modules/auth/useCases/validateUserUseCase/validate-user-use-case';
import { SingInDTOValidateMiddleware } from './middleware/singin-dto-validate-middleware';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signin-use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt-stategy';
import { DatabaseModule } from 'src/infra/database/database-module';

@Module({
  imports: [
    DatabaseModule, 
    UserModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: process.env.JWT_EXPIRE},
  })
  ],
  controllers: [AuthController],
  providers: [LocalStrategy,JwtStrategy, ValidateUserUseCase, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(SingInDTOValidateMiddleware).forRoutes('/signIn');
  }
}
