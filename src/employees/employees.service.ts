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

  getChildren(parentId: number): Employee[] {
    const children = this.employees.filter((e) => e.parentId === parentId);
    return children;
  }

  changeParent(employeeId: number, newParentId: number): Employee | undefined {
    const employee = this.employees.find((e) => e.id === employeeId);
    if (employee) {
      employee.parentId = newParentId;
    }
    return employee;
  }
}
