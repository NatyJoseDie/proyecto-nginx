import { Module } from '@nestjs/common';
import { EncuestaController } from './encuesta/encuesta.controller';
import { EncuestaService } from './encuesta/encuesta.service';

@Module({
  imports: [],
  controllers: [EncuestaController],
  providers: [EncuestaService],
})
export class AppModule {}
