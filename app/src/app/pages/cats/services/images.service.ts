import { Injectable } from '@angular/core';
import { Image } from '../types/image.type';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from 'src/app/core/constants/api.constants';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  
  constructor(private readonly http: HttpClient) {}

  getImagesByBreed(breedId: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${environment.apiUrl}${API_ENDPOINTS.IMAGES.BASE}${breedId}`); 
  }
}
