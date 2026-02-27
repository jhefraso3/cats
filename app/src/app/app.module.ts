import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigationModule } from "./pages/components/navigation/navigation.module";
import { SnackbarModule } from "./pages/components/snackbar/snackbar.module";
import { HighlightModule, HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { JwtInterceptor } from "./core/interceptors/jwt.interceptor";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    BrowserAnimationsModule,
    SnackbarModule,
    HighlightModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import("highlight.js/lib/core"),
        languages: {
          xml: () => import("highlight.js/lib/languages/xml"),
          typescript: () => import("highlight.js/lib/languages/typescript"),
          scss: () => import("highlight.js/lib/languages/scss"),
        },
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
