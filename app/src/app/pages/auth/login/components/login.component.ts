import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/pages/auth/services/auth.service";
import { SnackbarType } from "src/app/core/components/snackbar/models/snackbar-type";
import { SnackbarService } from "src/app/core/components/snackbar/service/snackbar.service";

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
    private authService: AuthService,
    private router: Router,
    private snackBar: SnackbarService,
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  login() {
  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);

      this.authService.saveUserProfile({
        username: res.username,
        firstName: res.firstName,
        lastName: res.lastName
      });

      this.router.navigate(['/user']); 
    },
    error: (err) => {
      this.snackBar.openCustomSnackbar(
        'Usuario y/o contraseña incorrecto.',
        SnackbarType.error,
      );
    },
  });
}

}
