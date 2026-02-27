import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "src/app/pages/login/services/login.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.loginService.isLogged()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
