import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerialService } from './serial/serial.service';
import { CityController } from './city/city.controller';
import { City } from './city/city.entity';
import { Serial } from './serial/serial.entity';
import { CityService } from './city/city.service';
import { SerialController } from './serial/serial.controller';
import { MastersModule } from './masters/masters.module';
import { UtilsModule } from './utils/utils.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    //Mongo Local
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb://172.16.1.226:27017/mbe-erp',
    //   database: 'mbe-erp',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   ssl: false,
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    // }),
    //Mongo Compass
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
    TypeOrmModule.forFeature(),
    MastersModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
