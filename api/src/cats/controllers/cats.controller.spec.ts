import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from '../cats.service';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  const mockCatsService = {
    getBreeds: jest.fn(),
    getBreedById: jest.fn(),
    searchBreeds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: mockCatsService,
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all breeds', async () => {
      const mockResponse = [
        { id: 'abys', name: 'Abyssinian' },
        { id: 'aege', name: 'Aegean' },
      ];

      mockCatsService.getBreeds.mockResolvedValue(mockResponse);

      const result = await controller.getAll();

      expect(service.getBreeds).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getById', () => {
    it('should return breed by id', async () => {
      const breedId = 'abys';
      const mockResponse = { id: 'abys', name: 'Abyssinian' };

      mockCatsService.getBreedById.mockResolvedValue(mockResponse);

      const result = await controller.getById(breedId);

      expect(service.getBreedById).toHaveBeenCalledWith(breedId);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('search', () => {
    it('should return filtered breeds', async () => {
      const filter = 'aby';
      const mockResponse = [{ id: 'abys', name: 'Abyssinian' }];

      mockCatsService.searchBreeds.mockResolvedValue(mockResponse);

      const result = await controller.search(filter);

      expect(service.searchBreeds).toHaveBeenCalledWith(filter);
      expect(result).toEqual(mockResponse);
    });
  });
});