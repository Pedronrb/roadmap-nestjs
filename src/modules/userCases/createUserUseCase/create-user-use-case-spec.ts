import { create } from 'domain';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/user-repository-in-memory';
import { CreateUserUseCase } from './create-user-use-case';
import { compare } from 'bcrypt';

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Criar um user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Pedro',
      password: '123123',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('Criar um user com senha encriptografada', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Pedro',
      password: userPasswordWithoutEncryption,
    });

    const userHasPasswordEncrypted = await compare(
      userPasswordWithoutEncryption,
      (await user).password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy;
  });
});
