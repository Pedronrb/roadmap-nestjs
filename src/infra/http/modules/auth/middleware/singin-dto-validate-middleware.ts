import { NextFunction } from "express";
import { SingInBody } from "../dto/singIn-body";
import { validate } from "class-validator";
import { Request } from "express";
import { IncorrectValuesException } from "src/exceptions/incorrect-values-exception";
import { mapperClassValidationErrorToAppException } from "src/utils/mappers";
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class SingInDTOValidateMiddleware implements NestMiddleware{

    async use(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        const signInBody = new SingInBody();
        signInBody.email = body.email;
        signInBody.password = body.password;

        const validations = await validate(signInBody);

        if(validations.length){
            throw new IncorrectValuesException({
                fields: mapperClassValidationErrorToAppException(validations),
            })
        }
        next();
    }

}