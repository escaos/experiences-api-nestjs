import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Languages } from './entity/Languages';
import { CreateLanguagesDto } from './dto/create-languages.dto';
import { UpdateLanguagesDto } from './dto/update-languages.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Languages)
    private readonly repository: Repository<Languages>,
  ) {}

  findAll(): Promise<Languages[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Languages> {
    return this.repository.findOne(id);
  }

  create(createDto: CreateLanguagesDto): Promise<Languages> {
    return this.repository.save(createDto);
  }

  async update(id: string, updateDto: UpdateLanguagesDto):
  Promise<Languages> {
    await this.repository.update(id, updateDto);
    return this.repository.findOne(id);
  }

  delete(id: string): Promise<Languages> {
    return this.repository.remove(await this.repository.findOne(id));
  }
}
