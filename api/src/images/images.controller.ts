import { Controller, Get, Query } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('imagesbybreedid')
export class ImagesController {
  constructor(private readonly service: ImagesService) {}

  @Get()
  get(@Query('breed_id') breedId: string) {
    return this.service.getImagesByBreed(breedId);
  }
}