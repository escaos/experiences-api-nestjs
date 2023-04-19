import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesService } from './countries.service';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { *Controller } from './*.controller';
import { *Service } from './*.service';
import { *Controller } from './*.controller';
import { *Service } from './*.service';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { CountriesService } from './countries.service';
import { LanguagesService } from './languages.service';
import { LanguagesService } from './languages.service';
import { CountriesService } from './countries.service';

import typeOrmConfig from './typeorm-config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController, LanguagesController, CountriesController, *Controller],
  providers: [AppService, CountriesService, LanguagesService, *Service],
})
export class AppModule {}
