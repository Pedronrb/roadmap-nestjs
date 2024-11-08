import { IsNotEmpty, IsOptional, IsString } from "class-validator/types/decorator/decorators"

export class EditNoteBody{

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description?: string
}