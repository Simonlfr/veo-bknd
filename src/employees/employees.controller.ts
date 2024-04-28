import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Post()
  addEmployee(@Body() body: { name: string; parentId: number }): Employee {
    return this.employeesService.addEmployee(body.name, body.parentId);
  }

  @Get(':parentId/children')
  async getChildren(
    @Param('parentId', ParseIntPipe) parentId: number,
  ): Promise<Employee[]> {
    return await this.employeesService.getChildren(parentId);
  }

  @Post(':employeeId/change-parent')
  changeParent(
    @Param('employeeId') employeeId: number,
    @Body('newParentId') newParentId: number,
  ): Employee | undefined {
    return this.employeesService.changeParent(employeeId, newParentId);
  }
}
