import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatsService } from './cats.service';
import { Breed } from '../types/breed.type';

describe('CatService', () => {
  let service: CatsService;
  let httpMock: HttpTestingController;

  const mockBreeds: Breed[] = [
    { id: 'abys', name: 'Abyssinian', origin: 'Etiopía', temperament: 'Activo', description: 'Descripción' },
    { id: 'beng', name: 'Bengal', origin: 'EE.UU.', temperament: 'Juguetón', description: 'Descripción' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatsService]
    });

    service = TestBed.inject(CatsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch breeds', () => {
    service.getBreeds().subscribe(breeds => {
      expect(breeds.length).toBe(2);
      expect(breeds).toEqual(mockBreeds);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cats/breeds');
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);
  });
});
