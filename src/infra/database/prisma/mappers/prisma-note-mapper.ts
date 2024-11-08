import { Note as NoteRaw } from '@prisma/client';
import { Note } from 'src/modules/note/entities/note';

export class PrismaNoteMapper {
  static toPrisma({
    createAt,
    description,
    id,
    title,
    userId,
  }: Note): NoteRaw {
    return {
      createAt,
      description,
      id,
      title,
      userId,
    };
  }

  static toDomain({
    createAt,
    description,
    id,
    title,
    userId,
  }: NoteRaw): Note {
    return new Note(
      {
        createAt,
        description,
        title,
        userId,
      },
      id,
    );
  }
}