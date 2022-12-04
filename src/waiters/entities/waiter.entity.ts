import { hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { OrderEntity } from 'src/orders/entities/order.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'waiter' })
export class WaiterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  @Exclude()
  password: string;

  @OneToMany(() => OrderEntity, order => order)
  orders: OrderEntity[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
