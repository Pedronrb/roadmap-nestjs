import { create } from "domain"
import { UserRepository } from "./UserRepository"
import { User } from "../entities/User"

export class Database implements UserRepository{
    create(user: User): Promise<void>{
        throw new Error("Method not implemented");
    }
} 