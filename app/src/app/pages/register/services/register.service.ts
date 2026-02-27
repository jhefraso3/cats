import { Injectable } from "@angular/core";
import { RegisterRequest } from "../types/register-request.type";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private baseUrl = "http://localhost:8080/auth";
  http: any;
  register(data: RegisterRequest) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
