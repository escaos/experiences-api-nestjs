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
import { *Service } from './*.service';
import { * } from './entity/*';
import { Create*Dto } from './dto/create-*.dto';
import { Update*Dto } from './dto/update-*.dto';

@ApiTags('*')
@Controller('*')
export class *Controller {
  constructor(private readonly service: *Service) {}

  @Get()
  @ApiOperation({ summary: 'Get all *' })
  @ApiResponse({ status: 200, description: 'The found records', type: [*] })
  findAll(): Promise<*[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single *' })
  @ApiResponse({ status: 200, description: 'The found record', type: * })
  findOne(@Param('id') id: string): Promise<*> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new *' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created', type: * })
  create(@Body() createDto: Create*Dto): Promise<*> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing *' })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated', type: * })
  update(@Param('id') id: string, @Body() updateDto: Update*Dto): Promise<*> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing *' })
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted', type: * })
  delete(@Param('id') id: string): Promise<*> {
    return this.service.delete(id);

  }

}
