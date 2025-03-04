import { DataSource } from 'typeorm';
import { Task } from 'src/task/entity/task.entity';
import { User } from 'src/user/entity/user.entity';
import { Log } from 'src/log/entity/log.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'taskflow',
  entities: [Task, User, Log],
  migrations: ['./src/migrations/*.{ts,js}'],
  migrationsTableName: 'custom_migration_table',
  synchronize: false,
});

/*
Para executar as migrations:

npm run migration:generate --name=NOMEDAMIGRATION
npm run migration:run
*/
