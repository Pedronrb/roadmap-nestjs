import { create } from "domain"
import { UserRepository } from "./user-repository"
import { User } from "../entities/user"

export class Database implements UserRepository{
    create(user: User): Promise<void>{
        throw new Error("Method not implemented");
    }
} 