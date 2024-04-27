import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: {
            addEmployee: jest.fn().mockImplementation((name, parentId) => ({
              id: Math.floor(Math.random() * 1000),
              name,
              parentId,
            })),
            getChildren: jest
              .fn()
              .mockImplementation((parentId) => [
                { id: 2, name: 'CFO', parentId },
              ]),
            changeParent: jest.fn().mockImplementation((id, newParentId) => ({
              id,
              parentId: newParentId,
            })),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add an employee', () => {
    controller.addEmployee({ name: 'CFO', parentId: 1 });
    expect(service.addEmployee).toHaveBeenCalledWith('CFO', 1);
  });

  it('should get children', () => {
    controller.getChildren(1);
    expect(service.getChildren).toHaveBeenCalledWith(1);
  });

  it('should change parent', () => {
    controller.changeParent(2, 3);
    expect(service.changeParent).toHaveBeenCalledWith(2, 3);
  });
});
