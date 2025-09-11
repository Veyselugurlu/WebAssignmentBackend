import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Render veya Heroku gibi servislerin verdiği PORT’u kullan
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
