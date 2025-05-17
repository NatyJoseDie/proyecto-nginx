import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  //acceder a la variables del  entorno ya procesadas
  const configService = app.get(ConfigService);

  const globalPrefix: string = configService.get('prefix') as string;

  app.setGlobalPrefix(globalPrefix);

  //versionado http.//localhost:3000/api/v1
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  //verificar que el objeto tenga las propiedades que queremos, restringe los objetos que recibe la app
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  //cuando se retorna un objeto por ej no devuelva contraseñas
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const swaggerHabilitado: boolean = configService.get(
    'swaggerHabilitado',
  ) as boolean;

  if (swaggerHabilitado) {
    const config = new DocumentBuilder()
      .setTitle('Encuestas')
      .setDescription('Descripción de la Api del sistema de encuestas')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(globalPrefix, app, document);
  }
  const port: number = configService.get<number>('port') as number;
  await app.listen(port);
}
bootstrap();
