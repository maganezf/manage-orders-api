import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @ManyToOne(() => OrderEntity, order => order.products, {
    createForeignKeyConstraints: false,
  })
  order: OrderEntity;

  @OneToOne(() => CategoryEntity, category => category, {
    eager: true,
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  category: CategoryEntity;
}
