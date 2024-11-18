import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData = {
    email: '',
    password: '',
  };

  errorMessage: string | null = null;
  loading = false; // Spinner toggle
  private apiUrl = 'http://localhost:5000/api/user/login'; // Backend API URL

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(): void {
    if (this.userData.email && this.userData.password) {
      this.errorMessage = null;
      this.loading = true; // Show spinner

      this.http.post(this.apiUrl, this.userData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.loading = false; // Hide spinner
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.loading = false; // Hide spinner
          this.errorMessage =
            error?.error?.message || 'Login failed. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
