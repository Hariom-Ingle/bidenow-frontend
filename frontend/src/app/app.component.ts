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
import { ToastService } from './services/toast.service';
import { ToastComponent } from './component/components/toast/toast.component';
import { HomeComponent } from './component/pages/home/home.component'; // Import HomeComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ...SharedImports,
    RouterOutlet,
    NavbarComponent,
    LoginComponent,
    VerifyEmailComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ToastComponent,
    HomeComponent // Add HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToastService],
})
export class AppComponent implements OnInit {
  scrollToSection(sectionId: string): void {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  
}
  title = 'frontend';

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    // Initialize user state from localStorage or API when app loads
    this.userService.initializeUserFromLocalStorage();
  }

  // Method to scroll to a specific section
 
}
