import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { catApi } from '../common/cat-api.client';
import { CATS_MESSAGES } from './constants/cats-messages.constants';

jest.mock('../common/cat-api.client', () => ({
  catApi: {
    get: jest.fn(),
  },
}));

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBreeds', () => {
    it('should return breeds list', async () => {
      const mockResponse = [
        { id: 'abys', name: 'Abyssinian' },
        { id: 'aege', name: 'Aegean' },
      ];

      (catApi.get as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await service.getBreeds();

      expect(catApi.get).toHaveBeenCalledWith('/breeds');
      expect(result).toEqual(mockResponse);
    });

    it('should throw HttpException on error', async () => {
      (catApi.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(service.getBreeds()).rejects.toThrow(HttpException);
      await expect(service.getBreeds()).rejects.toMatchObject({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: CATS_MESSAGES.ERROR.GET_BREEDS,
      });
    });
  });

  describe('getBreedById', () => {
    it('should return breed by id', async () => {
      const breedId = 'abys';
      const mockResponse = { id: 'abys', name: 'Abyssinian' };

      (catApi.get as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await service.getBreedById(breedId);

      expect(catApi.get).toHaveBeenCalledWith(`/breeds/${breedId}`);
      expect(result).toEqual(mockResponse);
    });

    it('should throw HttpException on error', async () => {
      (catApi.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(service.getBreedById('abys')).rejects.toThrow(HttpException);
      await expect(service.getBreedById('abys')).rejects.toMatchObject({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: CATS_MESSAGES.ERROR.GET_BREED_BY_ID,
      });
    });
  });

  describe('searchBreeds', () => {
    it('should return filtered breeds', async () => {
      const query = 'aby';
      const mockResponse = [{ id: 'abys', name: 'Abyssinian' }];

      (catApi.get as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await service.searchBreeds(query);

      expect(catApi.get).toHaveBeenCalledWith(
        `/breeds/search?q=${query}`,
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw HttpException on error', async () => {
      (catApi.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(service.searchBreeds('aby')).rejects.toThrow(HttpException);
      await expect(service.searchBreeds('aby')).rejects.toMatchObject({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: CATS_MESSAGES.ERROR.SEARCH,
      });
    });
  });
});