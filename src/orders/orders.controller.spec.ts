import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Status } from '../helpers/constants';
import { ProductEntity } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderBodyDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
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

    ordersController = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersController).toBeDefined();
  });

  it('should create a new order', async () => {
    const newOrder: CreateOrderDto = {
      table: 1,
      status: Status.IN_PRODUCTION,
      createdAt: '2023-11-11',
      products: [
        {
          id: 'product-id',
          name: 'product-name',
          description: 'product-description',
          price: 10,
          category: {
            id: 'category-id-1',
            name: 'category-name-1',
            description: 'category-description-1',
          },
          order: null,
        },
      ],
      customerName: 'fulano',
    };

    const expectedNewOrderResponse = {
      message: 'The order was created successfully',
      data: {
        id: 'order-id',
        table: 1,
        status: Status.IN_PRODUCTION,
        createdAt: '2023-11-11',
        products: [
          {
            id: 'product-id',
            name: 'product-name',
            description: 'product-description',
            price: 10,
            category: {
              id: 'category-id-1',
              name: 'category-name-1',
              description: 'category-description-1',
            },
            order: null,
          },
        ],
        customerName: 'fulano',
      },
    };

    jest
      .spyOn(ordersService, 'create')
      .mockResolvedValue(expectedNewOrderResponse);

    const result = await ordersController.create(newOrder);
    expect(result).toEqual(expectedNewOrderResponse);
  });

  it('should find all orders', async () => {
    const expectedOrdersResponse = {
      message: 'Got all orders successfully',
      data: [
        {
          id: 'order-id-1',
          table: 1,
          status: Status.IN_PRODUCTION,
          createdAt: '2023-11-11',
          products: [
            {
              id: 'product-id',
              name: 'product-name',
              description: 'product-description',
              price: 10,
              category: {
                id: 'category-id-1',
                name: 'category-name-1',
                description: 'category-description-1',
              },
              order: null,
            },
          ],
          customerName: 'fulano',
        },
        {
          id: 'order-id-2',
          table: 2,
          status: Status.WAITING,
          createdAt: '2023-11-05',
          products: [
            {
              id: 'product-id',
              name: 'product-name',
              description: 'product-description',
              price: 10,
              category: {
                id: 'category-id-1',
                name: 'category-name-1',
                description: 'category-description-1',
              },
              order: null,
            },
          ],
          customerName: 'fulano2',
        },
      ],
    };

    jest
      .spyOn(ordersService, 'findAll')
      .mockResolvedValue(expectedOrdersResponse);

    const result = await ordersController.findAll();
    expect(result).toEqual(expectedOrdersResponse);
  });

  it('should find an order by ID', async () => {
    const orderId = 'order-id';
    const expectedOrderResponse = {
      message: `The order with the id: '${orderId}' was got successfully`,
      data: {
        id: 'order-id-1',
        table: 1,
        status: Status.IN_PRODUCTION,
        createdAt: '2023-11-11',
        products: [
          {
            id: 'product-id',
            name: 'product-name',
            description: 'product-description',
            price: 10,
            category: {
              id: 'category-id-1',
              name: 'category-name-1',
              description: 'category-description-1',
            },
            order: null,
          },
        ],
        customerName: 'fulano',
      },
    };

    jest
      .spyOn(ordersService, 'findOne')
      .mockResolvedValue(expectedOrderResponse);

    const result = await ordersController.findOne(orderId);
    expect(result).toEqual(expectedOrderResponse);
  });

  it('should update an order', async () => {
    const orderId = 'order-id';

    const updatedOrder: UpdateOrderBodyDto = {
      id: 'order-id-1',
      table: 7,
      status: Status.IN_PRODUCTION,
      createdAt: '2023-11-04',
      products: [
        {
          id: 'product-id-2',
          name: 'product-name-2',
          description: 'product-description-2',
          price: 15,
          category: {
            id: 'category-id-2',
            name: 'category-name-2',
            description: 'category-description-2',
          },
        },
      ],
      customerName: 'fulano',
    };

    const expectedUpdatedOrderResponse = {
      message: 'The order was updated successfully',
      data: updatedOrder,
    };

    jest
      .spyOn(ordersService, 'update')
      .mockResolvedValue(expectedUpdatedOrderResponse);

    const result = await ordersController.update({ id: orderId }, updatedOrder);
    expect(result).toEqual(expectedUpdatedOrderResponse);
  });

  it('should remove an order by ID', async () => {
    const orderId = 'order-id-1';
    const expectedRemoveOrderResponse = {
      message: `The order with the id: '${orderId}' was removed successfully`,
      data: [
        {
          id: 'order-id-2',
          table: 2,
          status: Status.WAITING,
          createdAt: '2023-11-05',
          products: [
            {
              id: 'product-id',
              name: 'product-name',
              description: 'product-description',
              price: 10,
              category: {
                id: 'category-id-1',
                name: 'category-name-1',
                description: 'category-description-1',
              },
              order: null,
            },
          ],
          customerName: 'fulano2',
        },
      ],
    };

    jest
      .spyOn(ordersService, 'remove')
      .mockResolvedValue(expectedRemoveOrderResponse);

    const result = await ordersController.remove(orderId);
    expect(result).toEqual(expectedRemoveOrderResponse);
  });
});
