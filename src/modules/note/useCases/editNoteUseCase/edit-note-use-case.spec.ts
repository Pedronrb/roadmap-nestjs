import { makeUser } from "src/modules/user/factories/user-factory";
import { NoteRepositoryInMemory } from "../../repositories/note-repository-in-memory";
import { makeNote } from "../../factories/note-factory";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { EditNoteUseCase } from "./edit-note-use-case";
import { NoteNotFoundException } from "../../exceptions/note-not-found-exception";
import { NoteWithoutPermissionException } from "../../exceptions/note-without-permission-exception-props";


let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Edit Note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
    });

    it('Should be able to edit note ', async () =>{
      const user = makeUser({});
      const note = makeNote({
        userId: user.id,
      });
      
      noteRepositoryInMemory.notes = [note];

      const titleChanged = 'title changed';
      const descriptionChanged = 'description changed';

      await editNoteUseCase.execute({
        title: titleChanged,
        description: descriptionChanged,
        noteId: note.id,
        userId: note.userId
      })

      expect(noteRepositoryInMemory.notes[0].title).toEqual(titleChanged);
      expect(noteRepositoryInMemory.notes[0].description).toEqual(descriptionChanged);
    });

    it('Should be able to throw error when not found note', async () =>{
        expect(async () => {
            await editNoteUseCase.execute({
                title: 'Novamente',
                noteId: 'fakeId',
                userId: 'fakeId',
            });
        }).rejects.toThrow(NoteNotFoundException);
        });

    it('Should be able to throw error when note has another user', async () =>{
        const note = makeNote({});

        noteRepositoryInMemory.notes = [note];

        expect(async () => {
            await editNoteUseCase.execute({
                title: 'Novamente',
                noteId: note.id,
                userId: 'fakeId',
            });
        }).rejects.toThrow(NoteWithoutPermissionException);
    });
});