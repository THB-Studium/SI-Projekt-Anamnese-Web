import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { BackgroundComponent } from './components/background/background.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LogInComponent } from './components/log-in/log-in.component'
import { LoginService } from './components/log-in/login.service'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppConfigService } from './core/app-config.service'
import { CommonModule } from '@angular/common'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ResetPasswordComponent } from './components/log-in/reset-password/reset-password.component'
import { AuthInterceptor } from './core/authentification-and-authority/auth.Interceptor'
import { AuthGuard } from './core/authentification-and-authority/auth.guard'
import { SharedModule } from './shared/shared.module'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    ResetPasswordComponent,
    BackgroundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LoginService,
    AppConfigService,
    AuthGuard
  ],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
