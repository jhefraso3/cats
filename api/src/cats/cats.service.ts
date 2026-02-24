import { Injectable } from '@nestjs/common';
import { catApi } from '../common/cat-api.client';

@Injectable()
export class CatsService {

  getBreeds() {
    return catApi.get('/breeds').then(r => r.data);
  }

  getBreedById(id: string) {
    return catApi.get(`/breeds/${id}`).then(r => r.data);
  }

  searchBreeds(query: string) {
    return catApi.get(`/breeds/search?q=${query}`).then(r => r.data);
  }
}