import { ImagesService } from './images.service';
export declare class ImagesController {
    private readonly service;
    constructor(service: ImagesService);
    get(breedId: string): Promise<any>;
}
