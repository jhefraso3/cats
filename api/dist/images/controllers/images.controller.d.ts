import { ImagesService } from "../images.service";
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    getById(id: string): Promise<any>;
}
