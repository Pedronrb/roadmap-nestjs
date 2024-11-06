import { create } from 'domain';
import { UserRepository } from './user-repository';
import { User } from '../entities/user';

export class Database implements UserRepository {
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(user: User): Promise<void> {
    throw new Error('Method not implemented');
  }
}
