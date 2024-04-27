import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  private employees: Employee[] = [new Employee(1, 'CEO', null)];
  private idCounter = 2;

  addEmployee(name: string, parentId: number): Employee {
    const newEmployee = new Employee(this.idCounter++, name, parentId);
    this.employees.push(newEmployee);
    return newEmployee;
  }
}
