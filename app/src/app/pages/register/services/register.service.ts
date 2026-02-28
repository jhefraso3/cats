import { Injectable } from "@angular/core";
import { RegisterRequest } from "../types/register-request.type";
import { environment } from "src/environments/environment";
import { API_ENDPOINTS } from "src/app/core/constants/api.constants";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RegisterService {

  constructor(private readonly http: HttpClient) {}
  
  register(data: RegisterRequest) {
    return this.http.post(`${environment.apiUrl}${API_ENDPOINTS.REGISTER.BASE}`, data);
  }
}
