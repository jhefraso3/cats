import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from '../images.service';

describe('ImagesController', () => {
  let controller: ImagesController;
  let service: ImagesService;

  const mockImagesService = {
    getImagesByBreedId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        {
          provide: ImagesService,
          useValue: mockImagesService,
        },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    service = module.get<ImagesService>(ImagesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getById', () => {
    it('should return images by breed id', async () => {
      const breedId = 'abys';
      const mockResponse = [
        { id: 'img1', url: 'http://img1.jpg' },
        { id: 'img2', url: 'http://img2.jpg' },
      ];

      mockImagesService.getImagesByBreedId.mockResolvedValue(mockResponse);

      const result = await controller.getById(breedId);

      expect(service.getImagesByBreedId).toHaveBeenCalledWith(breedId);
      expect(result).toEqual(mockResponse);
    });
  });
});