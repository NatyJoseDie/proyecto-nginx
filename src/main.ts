import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // ✅ IMPORTANTE

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Agregá esta línea para activar la validación de DTOs
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
