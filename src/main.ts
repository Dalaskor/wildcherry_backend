import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Wildcherry')
    .setDescription('Документация по REST API сервиса Wildcherry')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  app.enableCors();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
  const PORT = Number(configService.get('PORT')) || 5000;
  await app.listen(PORT, () => {
    console.log(`The server has been started on port ${PORT}`);
  });
}
bootstrap();
