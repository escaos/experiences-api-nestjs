#!/bin/bash

# Load environment variables from .env
export $(grep -v '^#' .env | xargs)

# Read table names from entities.txt
tables=$(cat entities.txt | tr '\n' ',' | sed 's/,$//')

# Generate entities using typeorm-model-generator
typeorm-model-generator -h "$TYPEORM_HOST" -p "$TYPEORM_PORT" -u "$TYPEORM_USERNAME" -x "$TYPEORM_PASSWORD" -d "$TYPEORM_DATABASE" -e postgres -t "$tables" --noConfig --ce pascal --cp camel --output src/generated-entities

src_folder="src/generated-entities"
dest_folder="src"

for file in $src_folder/*; do
  base_name=$(basename "$file" .ts)
  folder_name=$(echo "$base_name" | tr '[:upper:]' '[:lower:]' | sed -r 's/entity//g')

  # Create the folder if it doesn't exist
  mkdir -p "$dest_folder/$folder_name/entity"
  mkdir -p "$dest_folder/$folder_name/dto"

  # Move the entity file into the folder
  mv "$file" "$dest_folder/$folder_name/entity/$base_name.ts"

  # Generate DTOs for create, read, update, and delete actions
  for method in create read update delete; do
    ucfirst_method=$(echo ${method:0:1} | tr '[:lower:]' '[:upper:]')${method:1}
    cat > "$dest_folder/$folder_name/dto/$method-$folder_name.dto.ts" <<EOF
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ${ucfirst_method}${base_name%Entity}Dto {
  // TODO: Update properties, decorators, and types based on the table information in PostgreSQL
}
EOF
  done

  # Generate the service using nest generate command
  nest generate service "$folder_name" --no-spec --flat

  # Move the generated service into the folder
  mv "src/$folder_name.service.ts" "$dest_folder/$folder_name/$folder_name.service.ts"

  # Remove the generated test file if it exists
  if [ -f "src/$folder_name.service.spec.ts" ]; then
      rm "src/$folder_name.service.spec.ts"
  fi

  # Update the service file with necessary methods
  cat > "$dest_folder/$folder_name/$folder_name.service.ts" <<EOF
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${base_name} } from './entity/$base_name';
import { Create${base_name%Entity}Dto } from './dto/create-$folder_name.dto';
import { Update${base_name%Entity}Dto } from './dto/update-$folder_name.dto';

@Injectable()
export class ${base_name%Entity}Service {
  constructor(
    @InjectRepository(${base_name})
    private readonly repository: Repository<${base_name}>,
  ) {}

  findAll(): Promise<${base_name}[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<${base_name}> {
    return this.repository.findOne(id);
  }

  create(createDto: Create${base_name%Entity}Dto): Promise<${base_name}> {
    return this.repository.save(createDto);
  }

  async update(id: string, updateDto: Update${base_name%Entity}Dto):
  Promise<${base_name}> {
    await this.repository.update(id, updateDto);
    return this.repository.findOne(id);
  }

  delete(id: string): Promise<${base_name}> {
    return this.repository.remove(await this.repository.findOne(id));
  }
}
EOF

  # Generate the controller using nest generate command
  nest generate controller "$folder_name" --no-spec --flat

  # Move the generated controller into the folder
  mv "src/$folder_name.controller.ts" "$dest_folder/$folder_name/$folder_name.controller.ts"

  # Remove the generated test file if it exists
  if [ -f "src/$folder_name.controller.spec.ts" ]; then
      rm "src/$folder_name.controller.spec.ts"
  fi

  # Update the controller file with necessary decorators
  cat > "$dest_folder/$folder_name/$folder_name.controller.ts" <<EOF
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
import { ${base_name%Entity}Service } from './$folder_name.service';
import { ${base_name%Entity} } from './entity/$base_name';
import { Create${base_name%Entity}Dto } from './dto/create-$folder_name.dto';
import { Update${base_name%Entity}Dto } from './dto/update-$folder_name.dto';

@ApiTags('$folder_name')
@Controller('$folder_name')
export class ${base_name%Entity}Controller {
  constructor(private readonly service: ${base_name%Entity}Service) {}

  @Get()
  @ApiOperation({ summary: 'Get all $folder_name' })
  @ApiResponse({ status: 200, description: 'The found records', type: [${base_name%Entity}] })
  findAll(): Promise<${base_name%Entity}[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single $folder_name' })
  @ApiResponse({ status: 200, description: 'The found record', type: ${base_name%Entity} })
  findOne(@Param('id') id: string): Promise<${base_name%Entity}> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new $folder_name' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created', type: ${base_name%Entity} })
  create(@Body() createDto: Create${base_name%Entity}Dto): Promise<${base_name%Entity}> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing $folder_name' })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated', type: ${base_name%Entity} })
  update(@Param('id') id: string, @Body() updateDto: Update${base_name%Entity}Dto): Promise<${base_name%Entity}> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing $folder_name' })
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted', type: ${base_name%Entity} })
  delete(@Param('id') id: string): Promise<${base_name%Entity}> {
    return this.service.delete(id);
  }
}
EOF

done

# Remove the generated-entities folder
rm -r "$src_folder"
