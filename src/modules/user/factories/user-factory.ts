import { User } from '../entities/user';

type Override = Partial<User>;

export const makeUser = ({ id, ...Override }: Override) => {
  return new User(
    {
      email: 'email@gmail.com',
      name: 'Pedro',
      password: '123123',
      ...Override,
    },
    id,
  );
};
