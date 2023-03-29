import { Status } from 'src/helpers/constants';
import { ProductEntity } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  table: number;

  @Column({ type: 'varchar', nullable: false, enum: Status })
  status: Status;

  @Column({ type: 'varchar', nullable: false })
  createdAt: string;

  @OneToMany(() => ProductEntity, product => product.order, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  products: ProductEntity[];

  @Column({ type: 'varchar', nullable: false })
  customerName: string;
}
