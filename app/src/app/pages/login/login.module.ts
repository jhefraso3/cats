import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login.component";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import { MaterialModule } from "src/app/shared/material/material.module";
import { SnackbarModule } from "../components/snackbar/snackbar.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, MaterialModule, SnackbarModule],
})
export class LoginModule {}
