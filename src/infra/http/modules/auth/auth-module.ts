import { Controller, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth-controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local-strategy';
import { DatabaseModule } from 'src/infra/database/prisma/database-module';
import { UserModule } from '../user/user-module';
import { ValidateUserUseCase } from 'src/modules/auth/useCases/validateUserUseCase/validate-user-use-case';
import { SingInDTOValidateMiddleware } from './middleware/singin-dto-validate-middleware';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: [LocalStrategy, ValidateUserUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(SingInDTOValidateMiddleware).forRoutes('/signIn');
  }
}
