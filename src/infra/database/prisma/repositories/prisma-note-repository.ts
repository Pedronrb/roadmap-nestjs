import { Injectable } from "@nestjs/common";
import { Note } from "src/modules/note/entities/note";
import { NoteRepository } from "src/modules/note/repositories/note-repository";
import { PrismaService } from "../prisma-service";
import { PrismaNoteMapper } from "../mappers/prisma-note-mapper";

@Injectable()
export class PrismaNoteRepository implements NoteRepository{

    constructor(private prisma: PrismaService){}
    
    create(note: Note): Promise<void> {
        const noteRaw = PrismaNoteMapper.toPrisma(note);

        await this.prisma.note.create({
            data: noteRaw,
        });
    }
    findById(id: string): Promise<Note | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(note: Note): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findManyByUserId(userId: string, page: number, perPage: number): Promise<Note[]> {
        throw new Error("Method not implemented.");
    }
    
}