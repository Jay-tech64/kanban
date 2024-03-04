import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "../shared/shared.module";
import { LoginPageComponent } from "./login-page/login-page.component";
import { GoogleSigninDirective } from "./google-signin.directive";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { environment } from "../../environments/environment.development";

@NgModule({
  declarations: [LoginPageComponent, GoogleSigninDirective],
  imports: [CommonModule, UserRoutingModule, SharedModule],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
})
export class UserModule {}
