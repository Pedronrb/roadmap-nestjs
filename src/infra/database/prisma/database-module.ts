import { Module } from "@nestjs/common";
import { PrismaService } from "./repositories/prisma-service";
import { UserRepository } from "src/modules/user/repositories/user-repository";
import { PrismaUserRepository } from "./repositories/prisma-user-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository,
        },
    ],
    exports: [UserRepository],
})

export class DatabaseModule {}