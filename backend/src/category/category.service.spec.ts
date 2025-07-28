import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from './category.schema';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategoryModel = {
    create: jest.fn().mockResolvedValue({ name: 'Backend' }),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([{ name: 'Backend' }]),
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getModelToken(Category.name),
          useValue: mockCategoryModel,
        }
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const result = await service.create({ name: 'Backend' });
    expect(result.name).toBe('Backend');
    expect(mockCategoryModel.create).toHaveBeenCalledWith({ name: 'Backend' })
  });

  it('should return all categories', async () => {
    const categories = await service.findAll();
    expect(categories).toEqual([{ name: 'Backend' }]);
    expect(mockCategoryModel.find).toHaveBeenCalled();
  });
});
