import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/pages/auth/services/auth.service";
import { SnackbarType } from "src/app/core/components/snackbar/models/snackbar-type";
import { SnackbarService } from "src/app/core/components/snackbar/service/snackbar.service";
import { RegisterRequest } from "src/app/pages/auth/register/types/register-request.type";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  standalone: false,
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  registerData!: RegisterRequest;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: SnackbarService,
  ) {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4)]],
      confirmPassword: ["", Validators.required],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.snackBar.openCustomSnackbar(
        "Diligencie toda la información.",
        SnackbarType.error,
      );
      return;
    }  

    this.registerData = this.registerForm.value;

    if (this.registerData.password !== this.registerForm.value.confirmPassword) {
      this.snackBar.openCustomSnackbar(
        "Las contraseñas no coinciden.",
        SnackbarType.error,
      );
      return;
    }

    this.loading = true;

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.snackBar.openCustomSnackbar(
          "Cuenta creada exitosamente.",
          SnackbarType.success,
        );
        this.loading = false;

        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 1500);
      },
      error: (err) => {
        this.snackBar.openCustomSnackbar(
          "Ocurrió un error al crear la cuenta.",
          SnackbarType.error,
        );
        this.loading = false;
      },
    });
  }
}
