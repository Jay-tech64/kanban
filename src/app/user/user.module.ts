import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "../shared/shared.module";
import { LoginPageComponent } from "./login-page/login-page.component";
import { GoogleSigninDirective } from "./google-signin.directive";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { environment } from "../../environments/environment.development";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { EmailLoginComponent } from "./email-login/email-login.component";

@NgModule({
  declarations: [
    LoginPageComponent,
    GoogleSigninDirective,
    EmailLoginComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
})
export class UserModule {}
