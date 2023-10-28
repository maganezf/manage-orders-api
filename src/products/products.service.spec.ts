import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseDto } from '../@types';
import { Status } from '../helpers/constants';
import { OrderEntity } from '../orders/entities/order.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(OrderEntity),
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

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  it('should create a new product', async () => {
    const newProduct: CreateProductDto = {
      name: 'product-name',
      description: 'product-description',
      category: {
        id: 'category-id-1',
        name: 'category-name-1',
        description: 'category-description-1',
      },
      price: 10,
    };

    const expectedNewProductResponse: ResponseDto<ProductEntity> = {
      message: 'success on create new category',
      data: {
        id: 'product-id',
        name: 'product-name',
        description: 'product-description',
        category: {
          id: 'category-id-1',
          name: 'category-name-1',
          description: 'category-description-1',
        },
        price: 10,
        order: null,
      },
    };

    jest
      .spyOn(productsService, 'create')
      .mockResolvedValue(expectedNewProductResponse);

    const result = await productsService.create(newProduct);
    expect(result).toEqual(expectedNewProductResponse);
  });

  it('should find all products', async () => {
    const expectedProductsResponse: ResponseDto<ProductEntity[]> = {
      message: 'Success on finding all products',
      data: [
        {
          id: 'product-id',
          name: 'product-name',
          description: 'product-description',
          category: {
            id: 'category-id-1',
            name: 'category-name-1',
            description: 'category-description-1',
          },
          price: 10,
          order: {
            id: 'order-id',
            table: 1,
            status: Status.IN_PRODUCTION,
            createdAt: '2023-11-11',
            products: [],
            customerName: 'fulano',
          },
        },
      ],
    };

    jest
      .spyOn(productsService, 'findAll')
      .mockResolvedValue(expectedProductsResponse);

    const result = await productsService.findAll();
    expect(result).toEqual(expectedProductsResponse);
  });

  it('should find a product by ID', async () => {
    const productId = 'product-id';
    const expectedProductResponse: ResponseDto<ProductEntity> = {
      message: 'Success on finding product by ID',
      data: {
        id: 'product-id',
        name: 'product-name',
        description: 'product-description',
        category: {
          id: 'category-id-1',
          name: 'category-name-1',
          description: 'category-description-1',
        },
        price: 10,
        order: {
          id: 'order-id',
          table: 1,
          status: Status.IN_PRODUCTION,
          createdAt: '2023-11-11',
          products: [],
          customerName: 'fulano',
        },
      },
    };

    jest
      .spyOn(productsService, 'findOne')
      .mockResolvedValue(expectedProductResponse);

    const result = await productsService.findOne(productId);
    expect(result).toEqual(expectedProductResponse);
  });

  it('should update a product', async () => {
    const productId = 'product-id';
    const updatedProduct: ProductEntity = {
      id: 'updated-product-id',
      name: 'updated-product-name',
      description: 'updated-product-description',
      price: 15,
      category: {
        id: 'category-id-1',
        name: 'category-name-1',
        description: 'category-description-1',
      },
      order: {
        id: 'order-id',
        table: 1,
        status: Status.IN_PRODUCTION,
        createdAt: '2023-11-11',
        products: [],
        customerName: 'fulano',
      },
    };

    const expectedUpdatedProductResponse: ResponseDto<Partial<ProductEntity>> =
      {
        message: 'Success on updating product',
        data: updatedProduct,
      };

    jest
      .spyOn(productsService, 'update')
      .mockResolvedValue(expectedUpdatedProductResponse);

    const result = await productsService.update(productId, updatedProduct);
    expect(result).toEqual(expectedUpdatedProductResponse);
  });

  it('should remove a product by ID', async () => {
    const productId = 'product-id-1'; // Replace with a valid product ID
    const expectedRemoveProductResponse: ResponseDto<ProductEntity[]> = {
      message: 'Success on removing product by ID',
      data: [
        {
          id: 'product-id-2',
          name: 'product-name-2',
          description: 'product-description-2',
          price: 15,
          category: {
            id: 'category-id-1',
            name: 'category-name-1',
            description: 'category-description-1',
          },
          order: {
            id: 'order-id-2',
            table: 6,
            status: Status.IN_PRODUCTION,
            createdAt: '2023-11-22',
            products: [],
            customerName: 'fulano',
          },
        },
      ],
    };

    jest
      .spyOn(productsService, 'remove')
      .mockResolvedValue(expectedRemoveProductResponse);

    const result = await productsService.remove(productId);
    expect(result).toEqual(expectedRemoveProductResponse);
  });
});
