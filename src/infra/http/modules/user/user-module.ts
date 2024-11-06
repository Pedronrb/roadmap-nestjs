import { Controller, Module } from '@nestjs/common';
import { UserController } from './user-controller';
import { CreateUserUseCase } from 'src/modules/userCases/createUserUseCase/create-user-use-case';
import { DatabaseModule } from 'src/infra/database/prisma/database-module';

@Module({
  imports: [DatabaseModule], // Qnd e module importamos ele.
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
