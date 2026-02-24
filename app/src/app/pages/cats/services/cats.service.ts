import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed } from '../types/breed.type';
import { Image } from '../types/image.type';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  private baseUrl = 'http://localhost:8080/api/cats';

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.baseUrl}/breeds`);
  }

  getImagesByBreed(breedId: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.baseUrl}/images/${breedId}`);
  }

}

