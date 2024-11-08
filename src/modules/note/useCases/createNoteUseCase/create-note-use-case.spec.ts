import { NoteRepositoryInMemory } from "../../repositories/note-repository-in-memory";
import { CreateNoteUseCase } from "./create-note-use-case";

let noteRepositoryInMemory: NoteRepositoryInMemory;
let createNoteUseCase: CreateNoteUseCase;

describe('Create Note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
    });

    it('Should be able to create note', async () =>{
        expect(noteRepositoryInMemory.notes).toEqual([]);

        const note = await createNoteUseCase.execute({
            title: 'NestJs RoadMap',
            userId: '123123'
        });

        expect(noteRepositoryInMemory.notes).toEqual([note])
    })
})