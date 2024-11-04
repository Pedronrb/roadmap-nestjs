import { create } from "domain";
import { UserRepositoryInMemory } from "src/modules/user/repositories/UserRepositoryInMemory"
import { CreateUserUseCase } from "./CreateUserUseCase";
import { compare } from "bcrypt";

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory); 
    });

    it("Criar um user", async() => {
        expect(userRepositoryInMemory.users).toEqual([]);

        const user = createUserUseCase.execute({
            email:"email@email.com",
            name: "Pedro",
            password: "123123"
        });

        expect(userRepositoryInMemory.users).toEqual([user]);
     });


     it("Criar um user com senha encriptografada", async() => {

        let userSenhaSemCripto = '123123';


        const user = createUserUseCase.execute({
            email:"email@email.com",
            name: "Pedro",
            password: userSenhaSemCripto,
        });

        const userHasPasswordEncrypted = await compare(
            userSenhaSemCripto,
            (await user).password,
        );

        expect(userHasPasswordEncrypted).toBeTruthy

       
     });

});