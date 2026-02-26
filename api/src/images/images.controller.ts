import { Controller, Get, Param, Query } from "@nestjs/common";
import { ImagesService } from "./images.service";

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':breedId')
  getById(@Param('breedId') id: string) {
    return this.imagesService.getImagesByBreedId(id);
  }
}
