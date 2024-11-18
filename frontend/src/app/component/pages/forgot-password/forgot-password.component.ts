import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink,  MatIconModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  userData = {
    email: '',
  };

  resetLinkSent: boolean = true; // Track if reset link was sent
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:5000/api/user/forgot-password'; // Backend API URL

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(): void {
    if (this.userData.email) {
      this.errorMessage = null;

      this.http.post(this.apiUrl, this.userData).subscribe({
        next: (response) => {
          console.log('Reset link sent successfully:', response);
          this.resetLinkSent = true; // Show confirmation UI
        },
        error: (error) => {
          console.error('Error sending reset link:', error);
          this.errorMessage = error?.error?.message || 'Please enter a valid email.';
        },
      });
    } else {
      this.errorMessage = 'Please enter your email.';
    }
  }
  
}
