import { Note } from "src/modules/note/entities/note";

export class NoteViewModel{
    static toHttp({createAt, description, id, title}: Note){
        return{
            createAt,
            description,
            id,
            title,
        };
    }
}