import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SnackbarType } from "src/app/pages/components/snackbar/models/snackbar-type";
import { SnackbarService } from "src/app/pages/components/snackbar/service/snackbar.service";
import { RegisterService } from "../services/register.service";
import { RegisterRequest } from "../types/register-request.type";

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
    private registerService: RegisterService,
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

    this.registerService.register(this.registerData).subscribe({
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
      error: (err: any) => {
        this.snackBar.openCustomSnackbar(
          err.console.error() ||
           "Ocurrió un error al crear la cuenta.",
          SnackbarType.error,
        );
        this.loading = false;
      },
    });
  }
}
