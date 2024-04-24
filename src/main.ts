import { enableProdMode, importProvidersFrom } from '@angular/core'


import { environment } from './environments/environment'
import { AppComponent } from './app/app.component'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { provideAnimations } from '@angular/platform-browser/animations'
import { routes } from './app/app.route'
import { provideRouter } from '@angular/router'
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { AuthGuard } from './app/core/authentification-and-authority/auth.guard'
import { AppConfigService } from './app/core/app-config.service'
import { LoginService } from './app/components/log-in/login.service'
import { AuthInterceptor } from './app/core/authentification-and-authority/auth.Interceptor'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { MatDialogModule } from '@angular/material/dialog'
import { MatNativeDateModule } from '@angular/material/core'

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      CommonModule, BrowserModule, MatCardModule, MatFormFieldModule, FormsModule, MatInputModule, MatIconModule,
      MatButtonModule, MatSnackBarModule, MatDialogModule, MatNativeDateModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LoginService,
    AppConfigService,
    AuthGuard,
    provideRouter(routes),
    provideAnimations()
  ]
})
  .catch(err => console.error(err))
