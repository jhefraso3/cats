import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LoginRequest } from "../types/login-request.type";
import { User } from "../../user/type/user.type";
import { LoginResponse } from "../types/login-response.type";
import { environment } from "src/environments/environment";
import { API_ENDPOINTS } from "src/app/core/constants/api.constants";

@Injectable({
  providedIn: "root",
})
export class LoginService {

  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();
  private userKey = "user";

  constructor(private http: HttpClient) {
    const token = localStorage.getItem("token");
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}${API_ENDPOINTS.LOGIN.BASE}`, credentials)
      .pipe(
        tap((res) => {
          this.setToken(res.token);
        }),
      );
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.tokenSubject.next(token);
  }

  logout() {
    localStorage.removeItem("token");
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  saveUserProfile(profile: User) {
    localStorage.setItem(this.userKey, JSON.stringify(profile));
  }

  getUserProfile(): User | null {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }

  clearUserProfile() {
    localStorage.removeItem(this.userKey);
    localStorage.removeItem("token");
  }
}
