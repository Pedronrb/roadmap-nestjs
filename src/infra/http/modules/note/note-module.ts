import { Module } from "@nestjs/common";
import { DatabaseModule } from 'src/infra/database/database-module';
import { UserModule } from "../user/user-module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "../auth/guards/jwt-auth-guard";
import { AuthModule } from "../auth/auth-module";
import { CreateNoteUseCase } from "src/modules/note/useCases/createNoteUseCase/create-note-use-case";
import { EditNoteBody } from "./dtos/edit-note-body";
import { EditNoteUseCase } from "src/modules/note/useCases/editNoteUseCase/edit-note-use-case";
import { DeleteNoteUseCase } from "src/modules/note/useCases/deleteNoteUseCase/delete-note-use-case";
import { GetNoteUseCase } from "src/modules/note/useCases/getNoteUseCase/get-note-use-case";
import { GetManyNoteUseCase } from "src/modules/note/useCases/getManyUseCase/get-many-note-use-case";
import { PrismaNoteMapper } from "src/infra/database/prisma/mappers/prisma-note-mapper";
import { NoteController } from "./note-controller";

@Module({
    controllers: [NoteController],
    imports: [DatabaseModule],
    providers: [
      CreateNoteUseCase,
      DeleteNoteUseCase,
      EditNoteUseCase,
      GetNoteUseCase,
      GetManyNoteUseCase,
    ],
  })
  export class NoteModule {}