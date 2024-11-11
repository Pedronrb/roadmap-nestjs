import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/is-not-empty-custom"
import { IsStringCustom } from "src/infra/http/classValidator/decorators/is-string-custom"

export class CreateNoteBody{
    @ApiProperty()
    @IsStringCustom()
    @IsNotEmptyCustom()             
    title: string

    @ApiProperty()
    @IsStringCustom()
    @IsOptional()
    description?: string
    
    @ApiProperty()
    @IsStringCustom()
    @IsNotEmptyCustom()   
    userId: string
}