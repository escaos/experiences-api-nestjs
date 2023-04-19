import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Languages } from './entity/Languages';
import { LanguagesService } from './languages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Languages])],
  providers: [LanguagesService],
  exports: [LanguagesService],
})
export class LanguagesModule {}
