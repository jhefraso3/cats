import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SnackbarType } from "src/app/pages/components/snackbar/models/snackbar-type";
import { SnackbarService } from "src/app/pages/components/snackbar/service/snackbar.service";
import { LoginService } from "../services/login.service";
import { LOGIN_MESSAGES } from "../constants/login-messages.constants";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: SnackbarService,
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.snackBar.openCustomSnackbar(
        LOGIN_MESSAGES.ERROR.EMPTY_USER_PASSWORD,
        SnackbarType.error,
      );
      return;
    }
    this.loginService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem("token", res.token);

        this.loginService.saveUserProfile({
          username: res.user.username,
          firstName: res.user.firstName,
          lastName: res.user.lastName,
        });

        this.router.navigate(["/user"]);
      },
      error: (err) => {
        this.snackBar.openCustomSnackbar(
          err.error.message || LOGIN_MESSAGES.ERROR.WRONG_USER_PASSWORD,
          SnackbarType.error,
        );
      },
    });
  }
}
