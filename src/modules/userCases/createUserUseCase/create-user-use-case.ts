import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/repositories/user-repository";
import { User } from "src/modules/user/entities/user";
import { Hash, hash } from "crypto";
import { hashSync } from "bcrypt";

interface CreateUserRequest {
    email: string;
    name: string;
    password: string;
}

@Injectable()
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute({email, name, password}: CreateUserRequest){ //Funções assíncronas aquelas que realizam operações que levam um tempo para serem concluídas, como chamadas de rede ou acesso a banco de dados
        const user = new User({
            email,
            name,
            password: await hashSync(password, 10),
        });
        await this.userRepository.create(user);
        return user;
    }
}