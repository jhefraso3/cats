import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { catApi } from "../common/cat-api.client";
import { CATS_MESSAGES } from "./constants/cats-messages.constants";

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);

  async getBreeds() {
    try {
      const { data } = await catApi.get("/breeds");
      return data;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        CATS_MESSAGES.ERROR.GET_BREEDS,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBreedById(id: string) {
    try {
      const { data } = await catApi.get(`/breeds/${id}`);
      return data;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        CATS_MESSAGES.ERROR.GET_BREED_BY_ID,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchBreeds(query: string) {
    try {
      const { data } = await catApi.get(`/breeds/search?q=${query}`);
      return data;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        CATS_MESSAGES.ERROR.SEARCH,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
