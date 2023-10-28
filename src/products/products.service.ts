import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ResponseDto } from '../@types';
import { OrderEntity } from '../orders/entities/order.entity';
import { ProductEntity } from '../products/entities/product.entity';
import type { CreateProductDto } from './dto/create-product.dto';
import type { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>
  ) {}

  async create(product: CreateProductDto): Promise<ResponseDto<ProductEntity>> {
    const products = await this.productsRepository.find();
    const newProduct = this.productsRepository.create(product);

    if (products.some(product => product.name === newProduct.name)) {
      throw new HttpException(
        'Already exists one product with this username',
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    await this.productsRepository.save(newProduct);

    return {
      message: `The product '${newProduct.name}' was created successfully`,
      data: newProduct,
    };
  }

  async findAll(): Promise<ResponseDto<ProductDto[]>> {
    const data = await this.productsRepository.find();

    return {
      message: 'Got all products successfully',
      data,
    };
  }

  async findOne(id: string): Promise<ResponseDto<ProductDto>> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product?.id) {
      throw new HttpException(
        "This product doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: `The product with the id: '${id}' was got successfully`,
      data: product,
    };
  }

  async update(
    id: string,
    updatedProduct: Partial<ProductDto>
  ): Promise<ResponseDto<Partial<ProductDto>>> {
    const oldProduct = await this.productsRepository.findOneBy({
      id,
    });

    if (!oldProduct?.id) {
      throw new HttpException(
        "This product doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    const product = { ...oldProduct, ...updatedProduct };

    await this.productsRepository.remove(oldProduct);
    await this.productsRepository.save(product);

    return {
      message: `The product was updated successfully`,
      data: product,
    };
  }

  async remove(id: string): Promise<ResponseDto<ProductDto[]>> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new HttpException(
        "This product doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    await this.productsRepository.remove(product);

    const orders = await this.ordersRepository.find();

    const ordersWithThisProduct = orders.filter(
      product => product.id === product.id
    );
    ordersWithThisProduct.forEach(
      async order => await this.ordersRepository.remove(order)
    );

    const data = await this.productsRepository.find();

    return {
      message: `The product with the id: '${id}' was removed successfully`,
      data,
    };
  }
}
