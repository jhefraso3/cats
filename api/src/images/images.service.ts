import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { catApi } from "../common/cat-api.client";
import { IMAGES_MESSAGES } from "./constants/images-messages.constants";

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  async getImagesByBreedId(breedId: string) {
    try {
      const { data } = await catApi.get(
        `/images/search?limit=10&breed_ids=${breedId}`,
      );
      return data;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        IMAGES_MESSAGES.ERROR.GET_IMAGES,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
