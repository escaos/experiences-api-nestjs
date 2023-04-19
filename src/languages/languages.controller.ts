import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LanguagesService } from './languages.service';
import { Languages } from './entity/Languages';
import { CreateLanguagesDto } from './dto/create-languages.dto';
import { UpdateLanguagesDto } from './dto/update-languages.dto';

@ApiTags('languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly service: LanguagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all languages' })
  @ApiResponse({ status: 200, description: 'The found records', type: [Languages] })
  findAll(): Promise<Languages[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single languages' })
  @ApiResponse({ status: 200, description: 'The found record', type: Languages })
  findOne(@Param('id') id: string): Promise<Languages> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new languages' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created', type: Languages })
  create(@Body() createDto: CreateLanguagesDto): Promise<Languages> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing languages' })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated', type: Languages })
  update(@Param('id') id: string, @Body() updateDto: UpdateLanguagesDto): Promise<Languages> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing languages' })
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted', type: Languages })
  delete(@Param('id') id: string): Promise<Languages> {
    return this.service.delete(id);
  }
}
