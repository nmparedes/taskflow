import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Log } from './entity/log.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async findAll() {
    return this.logRepository.find();
  }

  async createLog(
    action: string,
    entity: string,
    entityId: string,
    userId?: number,
    changes?: Record<string, any>,
  ) {
    const log = this.logRepository.create({
      action,
      entity,
      entityId,
      userId,
      changes,
    });
    return this.logRepository.save(log);
  }
}
