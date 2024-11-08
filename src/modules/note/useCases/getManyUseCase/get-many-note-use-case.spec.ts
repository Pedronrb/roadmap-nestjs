import { makeUser } from "src/modules/user/factories/user-factory";
import { NoteRepositoryInMemory } from "../../repositories/note-repository-in-memory";
import { makeNote } from "../../factories/note-factory";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { GetManyNoteUseCase } from "./get-many-note-use-case";
import { Note } from "../../entities/note";


let noteRepositoryInMemory: NoteRepositoryInMemory;
let getManyNoteUseCase: GetManyNoteUseCase;

describe('Get Note', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        getManyNoteUseCase = new GetManyNoteUseCase(noteRepositoryInMemory);
    });

    it('Should be able to get note many note', async () =>{
        const user = makeUser({});
        const notes = [... new Array(10)].map(() => makeNote({userId: user.id}));

        noteRepositoryInMemory.notes = notes;

        const result = await getManyNoteUseCase.execute({
            userId: user.id,
        });
        expect(result).toEqual(notes);
    });

    it('Should be able to get only user notes', async () =>{
        const user1 = makeUser({});
        const user2 = makeUser({});

        const notes = [...new Array(10)].map((_,index) => 
            makeNote({userId: index < 5 ? user1.id: user2.id}),
        );

        noteRepositoryInMemory.notes = notes;

        const result = await getManyNoteUseCase.execute({
            userId: user1.id,
        });
        console.log(result)
        expect(result).toHaveLength(5);
    });

    it('Should be able to control notes per page', async () =>{
        const user = makeUser({});

        const notes = [... new Array(10)].map(() => makeNote({userId: user.id}));

        noteRepositoryInMemory.notes = notes;

        const result = await getManyNoteUseCase.execute({
            userId: user.id,
            perPage: '8'
        });
        expect(result).toHaveLength(8);
    });

    it('Should be able to control notes  page', async () =>{
        const user = makeUser({});

        const notes = [... new Array(10)].map((_,index) => 
            makeNote({userId: user.id, title: index < 5 ? 'page1': 'page2'})
    );

        noteRepositoryInMemory.notes = notes;

        let result: Note[];

        result = await getManyNoteUseCase.execute({
            userId: user.id,
            perPage: '5',
            page: '2'
        });
        expect(result[0].title).toEqual('page2');

        result = await getManyNoteUseCase.execute({
            userId: user.id,
            perPage: '5',
            page: '1'
        });
        expect(result[0].title).toEqual('page1');
    });
});

