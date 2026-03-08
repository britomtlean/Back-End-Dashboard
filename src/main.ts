import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://dashboard-react-dot-ts.netlify.app/login',
      'https://dashboard-vite-react-ts-production.up.railway.app',
      'http://192.168.100.178:5173',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

    //COOKIE
    app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
