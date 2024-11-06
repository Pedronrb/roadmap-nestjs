import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/userCases/createUserUseCase/create-user-use-case';
import { CreateUserBody } from './dtos/create-user-body';
import { UserViewModel } from './viewModel/user-view-mode';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createPost(@Body() body: CreateUserBody) {
    const { email, name, password } = body;

    const user = await this.createUserUseCase.execute({
      email,
      name,
      password,
    });

    return UserViewModel.toHttp(user);
  }
}
