import { BadRequestException, Body, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { SingInBody } from "../dto/singIn-body";
import { validate } from "class-validator";
import { Request } from "express";

@Injectable()
export class SingInDTOValidateMiddleware implements NestMiddleware{

    async use(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        const signInBody = new SingInBody();
        signInBody.email = body.email;
        signInBody.password = body.password;

        const validations = await validate(signInBody);

        if(validations.length){
            throw new BadRequestException(validations)
        }
        next();
    }

}