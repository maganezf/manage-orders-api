import { Status } from 'src/helpers/constants';
import { ProductEntity } from 'src/products/entities/product.entity';
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

  @Column({ type: 'int', nullable: false })
  table: number;

  @Column({ type: 'varchar', nullable: false, enum: Status })
  status: Status;

  @Column({ type: 'varchar', nullable: false })
  createdAt: string;

  @OneToMany(() => ProductEntity, product => product.order, {
    onDelete: 'NO ACTION',
    eager: true,
  })
  @JoinColumn()
  products: ProductEntity[];

  @ManyToOne(() => WaiterEntity, waiter => waiter, {
    eager: true,
  })
  waiter: WaiterEntity;

  @Column({ type: 'varchar', nullable: false })
  customerName: string;
}
