import { NestFactory } from '@nestjs/core';
import { MoviesModule } from './movies.module';

async function bootstrap() {
  const app = await NestFactory.create(MoviesModule,  { abortOnError: false });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
