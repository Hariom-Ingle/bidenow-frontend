import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, HttpClientModule,MatProgressSpinnerModule,RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  token: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  isPasswordReset: boolean = false;  // To control conditional rendering
  email: string = '';  // The user's email, if you want to display it in the success message.


  private apiUrl = 'http://localhost:5000/api/user/reset-password'; // Base API URL

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    // Get the token from the URL
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      this.errorMessage = 'Invalid or missing token.';
    }
  }

  onResetPassword(): void {
    if (!this. password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    if (this. password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }


    if (!this.token) {
      this.errorMessage = 'Token is missing or invalid.';
      return;
    }

    // Append token to the URL as a query parameter
    const url = `${this.apiUrl}/${this.token}`;
    const payload = {password: this.password };

    // Make the HTTP request to reset the password
    this.http.post(url, payload).subscribe({
      next: (response) => {
        this.successMessage = 'Password reset successfully.';
        // this.email = response.email;  // Set the user's email if returned in the response
        this.isPasswordReset = true;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'An error occurred. Please try again.';
      },
    });
  }
}
