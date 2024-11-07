import { title } from "process";
import { Note } from "../entities/note";

type Override = Partial<Note>;
export const makeNote =({id, ... override }: Override) => {
    return new Note(
        {
            title: 'NestJs RoadMAp',
            userId: '123123',
            description: 'Siga o plano',
            ... override,
        },
        id,
    );
}