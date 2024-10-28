import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");
  app.setGlobalPrefix("api", { exclude: [''] });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.enableCors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
  })

  await app.listen(port);
}
bootstrap();
