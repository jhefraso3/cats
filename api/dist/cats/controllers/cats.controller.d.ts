import { CatsService } from '../cats.service';
export declare class CatsController {
    private readonly service;
    constructor(service: CatsService);
    getAll(): Promise<any>;
    getById(id: string): Promise<any>;
    search(filter: string): Promise<any>;
}
