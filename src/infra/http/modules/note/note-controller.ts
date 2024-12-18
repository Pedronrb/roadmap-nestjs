import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
  } from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/create-note-use-case';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/delete-note-use-case';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/edit-note-use-case';
import { GetManyNoteUseCase } from 'src/modules/note/useCases/getManyUseCase/get-many-note-use-case';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/get-note-use-case';
import { AuthenticatedRequestModel } from '../auth/models/authenticated-request-model';
import { CreateNoteBody } from './dtos/create-note-body';
import { NoteViewModel } from './viewModels/note-view-model';
import { EditNoteBody } from './dtos/edit-note-body';
import { ApiBearerAuth, ApiBody, ApiProperty } from '@nestjs/swagger';
  
  
  @Controller('notes')
  export class NoteController {
    constructor(
      private createNoteUseCase: CreateNoteUseCase,
      private deleteNoteUseCase: DeleteNoteUseCase,
      private editNoteUseCase: EditNoteUseCase,
      private getNoteUseCase: GetNoteUseCase,
      private getManyNoteUseCase: GetManyNoteUseCase,
    ) {}
  
    @Post()
    @ApiBearerAuth()
    @ApiBody({type: CreateNoteBody})
    async createNote(
      @Request() request: AuthenticatedRequestModel,
      @Body() body: CreateNoteBody,
    ) {
      const { title, description } = body;
  
      const user = await this.createNoteUseCase.execute({
        title,
        description,
        userId: request.user.Id,
      });
  
      return NoteViewModel.toHttp(user);
    }
  
    @Delete(':id')
    @ApiBearerAuth()
    async deleteNote(
      @Request() request: AuthenticatedRequestModel,
      @Param('id') noteId: string,
    ) {
      await this.deleteNoteUseCase.execute({
        noteId,
        userId: request.user.Id,
      });
    }
  
    @Put(':id')
    @ApiBearerAuth()
    @ApiBody({type: EditNoteBody})
    async editNote(
      @Request() request: AuthenticatedRequestModel,
      @Param('id') noteId: string,
      @Body() body: EditNoteBody,
    ) {
      const { title, description } = body;
  
      await this.editNoteUseCase.execute({
        noteId,
        userId: request.user.Id,
        title,
        description,
      });
    }
  
    @Get(':id')
    @ApiBearerAuth()
    async getNote(
      @Request() request: AuthenticatedRequestModel,
      @Param('id') noteId: string,
    ) {
      const user = await this.getNoteUseCase.execute({
        noteId,
        userId: request.user.Id,
      });
  
      return NoteViewModel.toHttp(user);
    }
  
    @Get()
    @ApiBearerAuth()
    async getManyNote(
      @Request() request: AuthenticatedRequestModel,
    ) {
      const users = await this.getManyNoteUseCase.execute({
        userId: request.user.Id,
      });
  
      return users.map(NoteViewModel.toHttp);
    }
  }