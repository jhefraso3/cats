import { Injectable } from '@nestjs/common';
import { catApi } from '../common/cat-api.client';

@Injectable()
export class ImagesService {

  getImagesByBreed(breedId: string) {
    return catApi.get(`/images/search?limit=10&breed_ids=${breedId}`)
      .then(r => r.data);
  }
}