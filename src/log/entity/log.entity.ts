import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string; // 'CREATE', 'UPDATE', 'DELETE'

  @Column()
  entity: string;

  @Column()
  entityId: string;

  @Column({ nullable: true })
  userId?: number;

  @Column({ type: 'json', nullable: true })
  changes?: Record<string, any>;

  @CreateDateColumn()
  timestamp: Date;
}
