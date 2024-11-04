import { randomUUID } from "crypto";
import { Replace } from "src/utils/Replace";

// Classe que define a estrutura com uma interface para modelar um User  
interface UserSchema{
    email: string;
    password: string;
    name: string;
    createdAt?: Date;
}

export class User{
    props: UserSchema; //props serve como um container para as propriedades do user.
    _id: string;

    //"?" significa que e opcional
    constructor(props: Replace<UserSchema, {createdAt?: Date}>, id?: string){
        this.props = {
            ...props, //"..." operador de espalhamento
            createdAt: props.createdAt || new Date(),
        }
        this._id = id || randomUUID(); // Identificador único para cada User
    }

    get id(): string{
        return this._id;
    }

    get email(): string {
        return this.props.email;
    }

    set email(email: string) {
        this.props.email = email;
    } 

    get password(): string {
        return this.props.password;
    }

    set password(password: string) {
        this.props.password = password;
    } 

    get nome(): string {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name  ;
    } 
    get createdAt(): Date {
        return this.props.createdAt || new Date(); // Retorna a data ou a nova data se não estiver definida
    }


}