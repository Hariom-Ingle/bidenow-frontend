import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  code: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}
  

  verifycode() {
    if (this.code.length !== 6) {
      this.errorMessage = 'code must be 6 digits.';
      this.successMessage = null;
      return;
    }
    const payload = {
      // email: this.email, // Ensure this.email is set and valid
      code: this.code // Ensure this.code is set and valid
    };
  
    console.log('Payload:', payload);
  
    const apiUrl = 'http://localhost:5000/api/user/verify-email';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.post(apiUrl, { code: this.code }, { headers }).subscribe(
      (response: any) => {
        this.successMessage = 'Email verified successfully!';
        this.router.navigate(['/login']);
        this.errorMessage = null;
      },
      (error) => {
        console.error('Error:', error);
        this.errorMessage = error.error.message || 'Failed to verify email.';
        this.successMessage = null;
        this.router.navigate(['/login']);

      }
    );
  }

  
}
