import { Injectable } from "@angular/core";
import { User } from "../type/user.type";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userKey = "user";

  getUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    return jwtDecode<User>(token);
  }

  getUserProfile(): User | null {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }
}
