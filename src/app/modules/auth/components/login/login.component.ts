import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { first, catchError, finalize } from 'rxjs/operators';
import { AuthService, CurrentUser } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  defaultAuth: any = {
    email: 'jose.sc@demo.com',
    password: 'demo',
  };

  loginForm: FormGroup;
  hasError = false;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  showFullscreenLoader = false; // Nueva propiedad para el loader

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.isLoading$ = this.authService.isLoading$;
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.showFullscreenLoader = true;

    const loginSubscr = this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(
        first(),
        catchError((error) => {
          this.hasError = true;
          return of(undefined);
        }),
        finalize(() => {
          this.showFullscreenLoader = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe((user: CurrentUser | undefined) => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        }
      });

    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
