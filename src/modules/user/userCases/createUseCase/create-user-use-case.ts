import { Injectable } from '@nestjs/common';
import { User } from '../../entities/User';
import { hash } from 'bcrypt';
import { UserRepository } from '../../repositories/user-repository';
import { UserWithSameEmailException } from '../../exception/user-with-same-email-exception ';


interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name, password }: CreateUserRequest) {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) throw new UserWithSameEmailException();

    const user = new User({
      email,
      name,
      password: await hash(password, 10),
    });

    await this.userRepository.create(user);

    return user;
  }
}