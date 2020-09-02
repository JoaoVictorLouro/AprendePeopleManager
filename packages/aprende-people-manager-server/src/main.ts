import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
  });
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Aprende people manager start on port: ${port}`);
}
bootstrap();
