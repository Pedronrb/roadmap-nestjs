import { makeUser } from "src/modules/user/factories/user-factory";
import { NoteRepositoryInMemory } from "../../repositories/note-repository-in-memory";
import { makeNote } from "../../factories/note-factory";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { GetNoteUSeCase } from "./get-note-use-case";


let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteUseCase: GetNoteUSeCase;

describe('Get Note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        getNoteUseCase = new GetNoteUSeCase(noteRepositoryInMemory);
    });

    it('Should be able to get note ', async () =>{
      const user = makeUser({});
      const note = makeNote({
        userId: user.id,});
      
      noteRepositoryInMemory.notes = [note];

      const result = await getNoteUseCase.execute({
        noteId: note.id,
        userId: note.userId
      });

      expect(result).toEqual(note);
    });

    it('Should be able to throw error when not found note', async () =>{
        expect(async () => {
            await getNoteUseCase.execute({
                noteId: 'fakeId',
                userId: 'fakeId',
            });
        }).rejects.toThrow(UnauthorizedException);
        });

    it('Should be able to throw error when note has another user', async () =>{
        const note = makeNote({});

        noteRepositoryInMemory.notes = [note];

        expect(async () => {
            await  getNoteUseCase.execute({
                noteId: note.id,
                userId: 'fakeId',
            });
        }).rejects.toThrow(UnauthorizedException);
    });
});