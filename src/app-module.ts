import { Module } from "@nestjs/common";
import { UserModule } from "./infra/http/modules/user/user-module";
import { DatabaseModule } from "./infra/database/prisma/database-module";

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [],
    providers: [],
})

export class AppModule{}