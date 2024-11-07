import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/user-module';
import { DatabaseModule } from './infra/database/prisma/database-module';
import { AuthModule } from './infra/http/modules/auth/auth-module';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwt-auth-guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [],
  providers: [
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
