import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { User } from "src/app/pages/auth/user/type/user.type";
import { RegisterRequest } from "src/app/pages/auth/register/types/register-request.type";
import { LoginRequest } from "../login/types/login-request.type";
import { AuthResponse } from "../types/auth-response.type";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost:8080/api/auth";

  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();
  private userKey = 'user';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem("token");
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
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

  getUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    return jwtDecode<User>(token);
  }

  register(data: RegisterRequest) {
    return this.http.post(`${this.baseUrl}/register`, data);
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
    localStorage.removeItem('token');
  }
}
