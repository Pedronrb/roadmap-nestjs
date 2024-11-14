import { UserRepositoryInMemory } from 'src/modules/user/repositories/user-repository-in-memory';
import { ValidateUserUseCase } from './validate-user-use-case';
import { hash } from 'bcrypt';
import { User } from 'src/modules/user/entities/user';
import { use } from 'passport';
import { makeUser } from 'src/modules/user/factories/user-factory';
import { UnauthorizedException } from '@nestjs/common';
import { AuthValuesIncorrectException } from '../../exceptions/auth-values-incorrect-exciption';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('retornar o uso quando as credenciais estiverem corretas', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it('capaz de lançar erro quando credenciais incorretas', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@gmail.com',
        password: userPasswordWithoutEncryption,
      });
    }).rejects.toThrow(AuthValuesIncorrectException);

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      });
    }).rejects.toThrow(AuthValuesIncorrectException);
  });
});
