import { request } from "node:http";
import { CreateUserUseCase } from "src/modules/user/userCases/createUseCase/create-user-use-case";
import { AuthenticatedRequestModel } from "../auth/models/authenticated-request-model";
import { CreateNoteBody } from "./dtos/create-note-body";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from "@nestjs/common";
import { CreateNoteUseCase } from "src/modules/note/useCases/createNoteUseCase/create-note-use-case";
import { NoteViewModel } from "./viewModels/note-view-model";
import { EditNoteUSeCase } from "src/modules/note/useCases/editNoteUseCase/edit-note-use-case";
import { DeleteNoteUseCase } from "src/modules/note/useCases/deleteNoteUseCase/delete-note-use-case";
import { GetNoteUseCase } from "src/modules/note/useCases/getNoteUseCase/get-note-use-case";
import { GetManyNoteUseCase } from "src/modules/note/useCases/getManyUseCase/get-many-note-use-case";
import { EditNoteBody } from "./dtos/edit-note-body";

@Controller('notes')
export class NoteController{
    constructor( 
        private createNoteUseCase: CreateNoteUseCase,
        private editNoteUseCase: EditNoteUSeCase,
        private deleteNoteUseCase: DeleteNoteUseCase,
        private getNoteUseCase: GetNoteUseCase,
        private getManyNoteUseCase: GetManyNoteUseCase,
    ) {}

    @Post()
    async createNote(
    @Request() request: AuthenticatedRequestModel, 
    @Body() body: CreateNoteBody){

        const {title, description} = body;


        const note = await this.createNoteUseCase.execute({
            title,
            userId: request.user.Id,
            description,
        });
        return NoteViewModel.toHttp(note);
    }

    @Put(':id')
    async editNote(
        @Request() request: AuthenticatedRequestModel,
        @Param('id') noteId: string, 
        @Body() body: EditNoteBody,
    ){
        const {title, description} = body;


        const note = await this.editNoteUseCase.execute({
            noteId,
            title,
            userId: request.user.Id,
            description,
        });
        return NoteViewModel.toHttp(note);
    }

    @Delete(':id')
    async deleteNote(
        @Request() request: AuthenticatedRequestModel,
        @Param('id') noteId: string, 
    ){
        const note = await this.deleteNoteUseCase.execute({
            noteId,
            userId: request.user.Id
        });
    }

    @Get(':id')
    async getNote(
        @Request() request: AuthenticatedRequestModel,
        @Param('id') noteId: string, 
    ){

        const note = await this.getNoteUseCase.execute({
            noteId,
            userId: request.user.Id,
        });

        return NoteViewModel.toHttp(note);
    }

    @Get()
    async getManyNote(
        @Request() request: AuthenticatedRequestModel,
        @Query('page') page: string,
        @Query('perPage') perPage: string,
    ){

        const note = await this.getManyNoteUseCase.execute({
            userId: request.user.Id,
            page,
            perPage,
        });

        return note.map(NoteViewModel.toHttp);
    }

}