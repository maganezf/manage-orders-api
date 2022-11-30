import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ResponseDto } from '../@types';
import { CategoryEntity } from '../categories/entities/category.entity';
import type { CategoryDto } from './dto/category.dto';
import type { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>
  ) {}

  async create(
    category: CreateCategoryDto
  ): Promise<ResponseDto<CategoryEntity>> {
    const newCategory = this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);

    return {
      message: `The category '${newCategory.name}' was created successfully`,
      data: newCategory,
    };
  }

  async findAll(): Promise<ResponseDto<CategoryDto[]>> {
    const data = await this.categoriesRepository.find();

    return {
      message: 'Got all categories successfully',
      data,
    };
  }

  async findOne(id: string): Promise<ResponseDto<CategoryDto>> {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category?.id) {
      throw new HttpException(
        "This category doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: `The category with the id: '${id}' was got successfully`,
      data: category,
    };
  }

  async update(
    id: string,
    updatedCategory: Partial<CategoryDto>
  ): Promise<ResponseDto<Partial<CategoryDto>>> {
    const oldCategory = await this.categoriesRepository.findOneBy({
      id,
    });

    if (!oldCategory?.id) {
      throw new HttpException(
        "This category doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    const category = { ...oldCategory, ...updatedCategory };

    await this.categoriesRepository.save(category);

    return {
      message: `The category was updated successfully`,
      data: category,
    };
  }

  async remove(id: string): Promise<ResponseDto<CategoryDto[]>> {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) {
      throw new HttpException(
        "This category doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    await this.categoriesRepository.remove(category);

    const data = await this.categoriesRepository.find();

    return {
      message: `The category with the id: '${id}' was removed successfully`,
      data,
    };
  }
}
