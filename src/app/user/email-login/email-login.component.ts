import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: "app-email-login",
  templateUrl: "./email-login.component.html",
  styleUrl: "./email-login.component.scss",
})
export class EmailLoginComponent {
  form!: FormGroup;
  type: "login" | "signup" | "reset" = "login";
  loading = false;
  serverMessage!: string;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ["", []],
    });
  }

  changeType(val: "login" | "signup" | "reset") {
    this.type = val;
  }

  get isLogin() {
    return this.type === "login";
  }

  get isSignup() {
    return this.type === "signup";
  }

  get isPasswordReset() {
    return this.type === "reset";
  }

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  get passwordConfirm() {
    return this.form.get("passwordConfirm");
  }

  get passwordDoesMatch() {
    if (this.type !== "signup") {
      return true;
    } else {
      return this.password?.value === this.passwordConfirm?.value;
    }
  }

  async onSubmit() {
    this.loading = true;
    this.serverMessage = "";
    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this.auth.signInWithEmailAndPassword(email, password);
      }

      if (this.isSignup) {
        await this.auth.createUserWithEmailAndPassword(email, password);
      }

      if (this.isPasswordReset) {
        await this.auth.sendPasswordResetEmail(email);
        this.serverMessage = "Check your email";
      }
    } catch (err: any) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
}
