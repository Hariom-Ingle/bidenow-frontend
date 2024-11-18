import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/components/navbar/navbar.component';
import { LoginComponent } from './component/pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VerifyEmailComponent } from './component/pages/verify-email/verify-email.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    LoginComponent,
    VerifyEmailComponent, // Include VerifyEmailComponent
    CommonModule, // Use CommonModule for shared directives
    FormsModule,
    HttpClientModule,
     
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
}
