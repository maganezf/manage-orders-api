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
import { CreateProductDto } from './dto/create-product.dto';
import {
  UpdateProductBodyDto,
  UpdateProductQueryDto,
} from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('/api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  create(@Body() newProduct: CreateProductDto) {
    return this.productsService.create(newProduct);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/edit')
  update(
    @Query() { id }: UpdateProductQueryDto,
    @Body() updatedProduct: UpdateProductBodyDto
  ) {
    return this.productsService.update(id, updatedProduct);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.remove(id);
  }
}
