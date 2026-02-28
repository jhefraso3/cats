export declare class CatsService {
    private readonly logger;
    getBreeds(): Promise<any>;
    getBreedById(id: string): Promise<any>;
    searchBreeds(query: string): Promise<any>;
}
