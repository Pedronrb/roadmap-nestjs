import { NotFoundException } from "@nestjs/common";
import { NoteRepository } from "../../repositories/note-repository";

interface EditNoteRequest{
    title: string;
    description?: string;
    noteId: string;
    userId: string;

}

export class EditNoteUSeCase{
    constructor(private noteRepository: NoteRepository){}

    async execute({description, noteId, title, userId }: EditNoteRequest){
        const note = await this.noteRepository.findById(noteId);

        if(!note) throw new NotFoundException();

        if(note.userId != userId) throw new NotFoundException();

        note.title = title;
        note.description = description ?? null;

        await this.noteRepository.save(note);

        return note;
    }
    
}