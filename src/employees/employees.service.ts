import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { MemoryDatabaseService } from 'src/data/memoryDatabase';

@Injectable()
export class EmployeesService {
  constructor(private memoryDatabaseService: MemoryDatabaseService) {}

  private employees: Employee[] = [new Employee(1, 'CEO', null)];
  private idCounter = 2;

  addEmployee(name: string, parentId: number): Employee {
    const newEmployee = new Employee(this.idCounter++, name, parentId);
    this.employees.push(newEmployee);
    return newEmployee;
  }

  getChildren(parentId: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const db = this.memoryDatabaseService.getDb();
      db.all(
        'SELECT * FROM employees WHERE parentId = ?',
        [parentId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        },
      );
    });
  }

  changeParent(employeeId: number, newParentId: number): Employee | undefined {
    const employee = this.employees.find((e) => e.id === employeeId);
    if (employee) {
      employee.parentId = newParentId;
    }
    return employee;
  }
}
