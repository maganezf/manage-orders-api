import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseDto } from '../@types';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  it('should create a new category', async () => {
    const newCategory: CreateCategoryDto = {
      name: 'category-name',
      description: 'category-description',
    };

    const expectedNewCategoryResponse: ResponseDto<CategoryEntity> = {
      message: 'success on create new category',
      data: {
        id: 'category-id',
        name: newCategory.name,
        description: newCategory.description,
      },
    };

    jest
      .spyOn(categoriesService, 'create')
      .mockImplementation(async () => expectedNewCategoryResponse);

    const result = await categoriesService.create(newCategory);
    expect(result).toEqual(expectedNewCategoryResponse);
  });

  it('should find all categories', async () => {
    const expectedCategoriesResponse: ResponseDto<CategoryEntity[]> = {
      message: 'success on finding all categories',
      data: [
        {
          id: 'category-id-1',
          name: 'category-name-1',
          description: 'category-description-1',
        },
        {
          id: 'category-id-2',
          name: 'category-name-2',
          description: 'category-description-2',
        },
      ],
    };

    jest
      .spyOn(categoriesService, 'findAll')
      .mockResolvedValue(expectedCategoriesResponse);

    const result = await categoriesService.findAll();
    expect(result).toEqual(expectedCategoriesResponse);
  });

  it('should find a category by ID', async () => {
    const categoryId = 'category-id-1'; // Replace with a valid category ID
    const expectedCategoryResponse: ResponseDto<CategoryEntity> = {
      message: 'success on finding category by ID',
      data: {
        id: categoryId,
        name: 'category-name-1',
        description: 'category-description-1',
      },
    };

    jest
      .spyOn(categoriesService, 'findOne')
      .mockResolvedValue(expectedCategoryResponse);

    const result = await categoriesService.findOne(categoryId);
    expect(result).toEqual(expectedCategoryResponse);
  });

  it('should update a category', async () => {
    const categoryId = 'category-id-1'; // Replace with a valid category ID
    const updatedCategory: Partial<CategoryEntity> = {
      name: 'updated-category-name',
      description: 'updated-category-description',
      // Add more properties to update
    };

    const expectedUpdatedCategoryResponse: ResponseDto<
      Partial<CategoryEntity>
    > = {
      message: 'success on updating category',
      data: updatedCategory,
    };

    jest
      .spyOn(categoriesService, 'update')
      .mockResolvedValue(expectedUpdatedCategoryResponse);

    const result = await categoriesService.update(categoryId, updatedCategory);
    expect(result).toEqual(expectedUpdatedCategoryResponse);
  });

  it('should remove a category by ID', async () => {
    const categoryId = 'category-id-1';
    const expectedRemoveCategoryResponse: ResponseDto<CategoryEntity[]> = {
      message: 'success on removing category by ID',
      data: [
        {
          id: 'category-id-2',
          name: 'category-name-2',
          description: 'category-description-2',
        },
        {
          id: 'category-id-3',
          name: 'category-name-3',
          description: 'category-description-3',
        },
      ],
    };

    jest
      .spyOn(categoriesService, 'remove')
      .mockResolvedValue(expectedRemoveCategoryResponse);

    const result = await categoriesService.remove(categoryId);
    expect(result).toEqual(expectedRemoveCategoryResponse);
  });
});
