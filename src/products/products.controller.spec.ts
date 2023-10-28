import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseDto } from '../@types';
import { Status } from '../helpers/constants';
import { OrderEntity } from '../orders/entities/order.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
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

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
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
      message: 'success on create new product',
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

    const result = await productsController.create(newProduct);
    expect(result).toEqual(expectedNewProductResponse);
  });

  it('should find all products', async () => {
    const expectedProductsResponse: ResponseDto<ProductEntity[]> = {
      message: 'Success on finding all products',
      data: [
        {
          id: 'product-id-1',
          name: 'product-name-1',
          price: 10,
          description: 'product-description-1',
          category: {
            id: 'category-id-1',
            name: 'category-name-1',
            description: 'category-description-1',
          },
          order: {
            id: 'order-id-1',
            table: 1,
            status: Status.IN_PRODUCTION,
            createdAt: '2023-11-11',
            products: [],
            customerName: 'fulano',
          },
        },
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
      .spyOn(productsService, 'findAll')
      .mockResolvedValue(expectedProductsResponse);

    const result = await productsController.findAll();
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

    const result = await productsController.findOne(productId);
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

    const result = await productsController.update(
      { id: productId },
      updatedProduct
    );
    expect(result).toEqual(expectedUpdatedProductResponse);
  });

  it('should remove a product by ID', async () => {
    const productId = 'product-id-1';
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
