import { Module } from '@nestjs/common';

import { UserRepository } from 'src/modules/user/repositories/user-repository';
import { PrismaService } from './prisma/prisma-service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { NoteRepository } from 'src/modules/note/repositories/note-repository';


@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
