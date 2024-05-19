import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Store} from '@ngrx/store';
import {signInRequest} from "../../store/actions/auth.actions";

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss'
})
export class SigninFormComponent {
  loginForm: FormGroup;
  error: string = '';
  hide = true;

  @Output() toggleFormEvent = new EventEmitter<void>();

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    const credentials = {username: this.loginForm.value.username, password: this.loginForm.value.password};

    this.store.dispatch(signInRequest({credentials}));
  }

  toggleForm() {
    this.router.navigate(['/signup'])
  }
}
