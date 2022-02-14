import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Pages
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { ListProductsComponent } from './components/product-list/product-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormUserComponent } from './components/form-user/form-user.component';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// Others
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// JWT
import { JwtModule } from '@auth0/angular-jwt';

// Auth
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListProductsComponent,
    IndexComponent,
    UserListComponent,
    FormUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['localhost:4000'],
        // blacklistedRoutes: ['localhost:4000/api/auth']
      }
    }),
    FormsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
