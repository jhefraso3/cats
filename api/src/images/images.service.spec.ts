import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { catApi } from '../common/cat-api.client';
import { IMAGES_MESSAGES } from './constants/images-messages.constants';

jest.mock('../common/cat-api.client', () => ({
  catApi: {
    get: jest.fn(),
  },
}));

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesService],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getImagesByBreedId', () => {
    it('should return images by breed id', async () => {
      const breedId = 'abys';
      const mockResponse = [
        { id: 'img1', url: 'http://img1.jpg' },
        { id: 'img2', url: 'http://img2.jpg' },
      ];

      (catApi.get as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await service.getImagesByBreedId(breedId);

      expect(catApi.get).toHaveBeenCalledWith(
        `/images/search?limit=10&breed_ids=${breedId}`,
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw HttpException on error', async () => {
      (catApi.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(
        service.getImagesByBreedId('abys'),
      ).rejects.toThrow(HttpException);

      await expect(
        service.getImagesByBreedId('abys'),
      ).rejects.toMatchObject({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: IMAGES_MESSAGES.ERROR.GET_IMAGES,
      });
    });
  });
});