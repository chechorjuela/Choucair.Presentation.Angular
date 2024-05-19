import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from './atoms/button/button.component';
import {InputComponent} from './atoms/input/input.component';
import {HomeComponent} from './pages/home/home.component';
import {MainLayoutComponent} from './templates/main-layout/main-layout.component';
import {SignupFormComponent} from './modules/signup-form/signup-form.component';
import {SigninFormComponent} from './modules/signin-form/signin-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";

import {taskReducer} from './store/reducers/task.reducer';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {TaskEffects} from "./store/effects/task.effects";
import {AuthEffects} from "./store/effects/auth.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {NavbarComponent} from './modules/navbar/navbar.component';
import {LayoutComponent} from './organisms/layout/layout.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TaskComponent} from './pages/task/task.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {authReducer} from "./store/reducers/auth.reducer";
import {MatTableModule} from "@angular/material/table";
import {TaskFormComponent} from './modules/task-form/task-form.component';
import {ModalComponent} from './modules/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TaskModalComponent} from './modules/task-modal/task-modal.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ConfirmDeleteComponent } from './modules/confirm-delete/confirm-delete.component';
import {LoginGuard} from "./guard/login.guard";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { LoadingSpinnerComponent } from './modules/loading-spinner/loading-spinner.component';
import {LoadingInterceptor} from "./interceptors/loading.interceptor";
import {LoadingService} from "./utils/loading.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HttpHelperService} from "./utils/http-helper.service";



@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    InputComponent,
    HomeComponent,
    MainLayoutComponent,
    SignupFormComponent,
    SigninFormComponent,
    NavbarComponent,
    LayoutComponent,
    TaskComponent,
    ProfileComponent,
    TaskFormComponent,
    ModalComponent,
    TaskModalComponent,
    ConfirmDeleteComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatToolbarModule,
    StoreModule.forRoot({
      tasks: taskReducer,
      auth: authReducer
    }),
    EffectsModule.forRoot([TaskEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25}),

  ],
  providers: [
    LoginGuard,
    LoadingService,
    HttpHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
