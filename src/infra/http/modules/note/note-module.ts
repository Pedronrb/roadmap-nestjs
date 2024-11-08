import { Module } from "@nestjs/common";
import { DatabaseModule } from 'src/infra/database/database-module';
import { UserModule } from "../user/user-module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "../auth/guards/jwt-auth-guard";
import { AuthModule } from "../auth/auth-module";
import { CreateNoteUseCase } from "src/modules/note/useCases/createNoteUseCase/create-note-use-case";
import { EditNoteBody } from "./dtos/edit-note-body";
import { EditNoteUSeCase } from "src/modules/note/useCases/editNoteUseCase/edit-note-use-case";
import { DeleteNoteUseCase } from "src/modules/note/useCases/deleteNoteUseCase/delete-note-use-case";
import { GetNoteUseCase } from "src/modules/note/useCases/getNoteUseCase/get-note-use-case";
import { GetManyNoteUseCase } from "src/modules/note/useCases/getManyUseCase/get-many-note-use-case";

@Module({
    imports: [DatabaseModule, UserModule, AuthModule,],
    controllers: [],
    providers: [
        CreateNoteUseCase,
        EditNoteUSeCase,
        DeleteNoteUseCase,
        GetNoteUseCase,
        GetManyNoteUseCase,
    ],
})
export class NoteModule{}