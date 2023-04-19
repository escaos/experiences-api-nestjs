import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countries } from './entity/Countries';
import { CountriesService } from './countries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Countries])],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
