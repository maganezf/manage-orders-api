import { Status } from 'src/helpers/constants';
import { ProductDto } from 'src/products/dto/product.dto';
import { ProductEntity } from 'src/products/entities/product.entity';
import { WaiterDto } from 'src/waiters/dto/waiter.dto';
import { WaiterEntity } from 'src/waiters/entities/waiter.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'number', nullable: false })
  table: number;

  @Column({ type: 'varchar', nullable: false, enum: Status })
  status: Status;

  @Column({ type: 'varchar', nullable: false })
  createdAt: string;

  @OneToMany(() => ProductEntity, product => product, { onDelete: 'SET NULL' })
  @JoinColumn()
  products: ProductDto[];

  @ManyToOne(() => WaiterEntity, waiter => waiter, { onDelete: 'CASCADE' })
  waiter: WaiterDto;

  @Column({ type: 'varchar', nullable: false })
  customerName: string;
}
