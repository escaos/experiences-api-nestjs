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
import { CountriesService } from './countries.service';
import { Countries } from './entity/Countries';
import { CreateCountriesDto } from './dto/create-countries.dto';
import { UpdateCountriesDto } from './dto/update-countries.dto';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly service: CountriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'The found records', type: [Countries] })
  findAll(): Promise<Countries[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single countries' })
  @ApiResponse({ status: 200, description: 'The found record', type: Countries })
  findOne(@Param('id') id: string): Promise<Countries> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new countries' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created', type: Countries })
  create(@Body() createDto: CreateCountriesDto): Promise<Countries> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing countries' })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated', type: Countries })
  update(@Param('id') id: string, @Body() updateDto: UpdateCountriesDto): Promise<Countries> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing countries' })
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted', type: Countries })
  delete(@Param('id') id: string): Promise<Countries> {
    return this.service.delete(id);
  }
}
