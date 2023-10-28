import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../../helpers/constants';
import { ProductEntity } from '../../products/entities/product.entity';

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
