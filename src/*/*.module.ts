import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { * } from './entity/*';
import { *Service } from './*.service';

@Module({
  imports: [TypeOrmModule.forFeature([*])],
  providers: [*Service],
  exports: [*Service],
})
export class *Module {}
