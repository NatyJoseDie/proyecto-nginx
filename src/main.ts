<<<<<<< HEAD
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
=======
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
>>>>>>> a557459f475bafc841c466586223954d86a68ff3

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
  // Seguridad
  app.use(helmet());

  // Prefijo global para la API
  app.setGlobalPrefix('api');

  // Versionado
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Validación
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Encuestas')
    .setDescription('API del sistema de encuestas')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

=======
  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200', // URL de tu frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

>>>>>>> a557459f475bafc841c466586223954d86a68ff3
  await app.listen(3000);
}
bootstrap();
