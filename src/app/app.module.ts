import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '../app/shared/services/auth/auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth-guard.service';

@NgModule({
  imports: [
    HttpClientModule, 
    BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    routing,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
