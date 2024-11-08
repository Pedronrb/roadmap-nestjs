import { NotFoundException } from "@nestjs/common";
import { NoteRepository } from "../../repositories/note-repository";


interface GetManyNoteRequest{
    userId: string,
    page?: string,
    perPage?: string
}

export class GetManyNoteUseCase{
    constructor(private noteRepository: NoteRepository){}

    async execute({userId, page, perPage }: GetManyNoteRequest){
        const DEFAULT_PAGE = 1;
        const DEFAUL_PER_PAGE = 20;

        const currentPage = Number(page) || DEFAULT_PAGE;
        const currentPerPage = Number(perPage) || DEFAUL_PER_PAGE;

        const notes = await this.noteRepository.findManyByUserId(
            userId,
            currentPage,
            currentPerPage
        );

        return notes;
    }
    
}