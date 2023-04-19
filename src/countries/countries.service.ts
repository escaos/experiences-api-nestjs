import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Countries } from './entity/Countries';
import { CreateCountriesDto } from './dto/create-countries.dto';
import { UpdateCountriesDto } from './dto/update-countries.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Countries)
    private readonly repository: Repository<Countries>,
  ) {}

  findAll(): Promise<Countries[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Countries> {
    return this.repository.findOne(id);
  }

  create(createDto: CreateCountriesDto): Promise<Countries> {
    return this.repository.save(createDto);
  }

  async update(id: string, updateDto: UpdateCountriesDto): Promise<Countries> {
    await this.repository.update(id, updateDto);
    return this.repository.findOne(id);
  }

  delete(id: string): Promise<Countries> {
    return this.repository.remove(await this.repository.findOne(id));
  }
}
