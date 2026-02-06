import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away fields that are not in the DTO
      forbidNonWhitelisted: true, // Throws error if extra fields are sent
      transform: true, // Automatically transforms types
      stopAtFirstError: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
