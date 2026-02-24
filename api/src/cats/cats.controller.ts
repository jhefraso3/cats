import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('breeds')
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Get()
  getAll() {
    return this.service.getBreeds();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getBreedById(id);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.service.searchBreeds(q);
  }
}