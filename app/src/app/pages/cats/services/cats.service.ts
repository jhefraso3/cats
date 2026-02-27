import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed } from '../types/breed.type';
import { API_ENDPOINTS } from 'src/app/core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${URL}${API_ENDPOINTS.IMAGES.BASE}`);
  }

}

