import { Injectable, NotFoundException } from "@nestjs/common";
import { NoteRepository } from "../../repositories/note-repository";
import { NoteNotFoundException } from "../../exceptions/note-not-found-exception";
import { NoteWithoutPermissionException } from "../../exceptions/note-without-permission-exception-props";


interface GetNoteRequest{
    noteId: string;
    userId: string;

}
@Injectable()
export class GetNoteUseCase{
    constructor(private noteRepository: NoteRepository){}

    async execute({noteId, userId }: GetNoteRequest){
        const note = await this.noteRepository.findById(noteId);

        if(!note) throw new NoteNotFoundException();

        if(note.userId != userId) throw new NoteWithoutPermissionException({
            actionName: 'recuperar' ,
        });

        return note;
    }
    
}