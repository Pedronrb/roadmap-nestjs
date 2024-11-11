import { NestFactory } from '@nestjs/core';
import { AppModule } from './app-module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { IncorrectValuesException } from './exceptions/incorrect-values-exception';
import { mapperClassValidationErrorToAppException } from './utils/mappers';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest Roadmap')
    .setDescription('Aplicação Nest')
    .setVersion('1.0')
    .addTag('app')
    .addBearerAuth() 
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors: ValidationError[]) {
        throw new IncorrectValuesException({
          fields: mapperClassValidationErrorToAppException(errors),
        });
      },
    }),
  );
  await app.listen(3000);
}

bootstrap();