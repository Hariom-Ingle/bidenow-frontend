import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/components/navbar/navbar.component';
import { LoginComponent } from './component/pages/login/login.component';
import { VerifyEmailComponent } from './component/pages/verify-email/verify-email.component';
import { SharedImports } from './component/shared/shared-imports';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ...SharedImports,
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
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    // Initialize user state from localStorage or API when app loads
    this.userService.initializeUserFromLocalStorage();
  }
}
