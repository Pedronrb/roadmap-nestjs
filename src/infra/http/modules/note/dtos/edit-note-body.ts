import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditNoteBody{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string
}