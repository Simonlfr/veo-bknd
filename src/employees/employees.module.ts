import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MemoryDatabaseService } from 'src/data/memoryDatabase';

@Module({
  providers: [EmployeesService, MemoryDatabaseService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
