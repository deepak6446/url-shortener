import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  // Create a NestJS application instance using the root module (AppModule)
  const app = await NestFactory.create(AppModule);
  console.log(`server running on port: ${process.env.PORT}`)
  // Start the application and have it listen on the specified port from the environment variables
  await app.listen(process.env.PORT);
}

// Initialize the application
bootstrap();
