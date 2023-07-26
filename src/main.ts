import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

/*
      TICKET
Corregir POST /cars
  - CreateCarDto debe recibir un img:File -> mapearlo a img:string -> pasarlo al servicio
  - Mejorar las validaciones y testearlas

      TICKET
Corregir PATCH /cars/:id
  - UpdateCarDto debe recibir un img:File -> mapearlo a img:string -> pasarlo al servicio
  - Testear la funcionalidad
*/
