import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import {
  UpdateCategoryBodyDto,
  UpdateCategoryQueryDto,
} from '../categories/dto/update-category.dto';
import { CategoriesService } from './categories.service';

@Controller('/api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/create')
  create(@Body() newCategory: CreateCategoryDto) {
    return this.categoriesService.create(newCategory);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/edit')
  update(
    @Query() { id }: UpdateCategoryQueryDto,
    @Body() updatedCategory: UpdateCategoryBodyDto
  ) {
    return this.categoriesService.update(id, updatedCategory);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoriesService.remove(id);
  }
}
