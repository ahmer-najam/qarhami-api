import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { UtilsModule } from './utils/utils.module';
import { AuthenticationGuard } from './auth/guards/Authentication.guard';
import { MastersModule } from './masters/masters.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://qarhami:qarhami2024v1@cluster0.ey6gdct.mongodb.net/qarhami-v1?retryWrites=true&w=majority&appName=Cluster0',
      synchronize: true, // Automatically creates database schema based on your entities (use carefully in production)
      useUnifiedTopology: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api/(.*)'],
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature(),
    MastersModule,
    UtilsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [JwtService, AppService, JwtService, AuthenticationGuard],
})
export class AppModule {}
