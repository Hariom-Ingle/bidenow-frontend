import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

 
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,RouterLink ,MatIconModule ], // Import HttpClientModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: '',
  };

  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:5000/api/user/register'; // Backend API URL

  constructor(private router: Router, private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // You can store the file in `userData` or process it as needed
      console.log('Selected file:', file);
      // this.userData.profileImage = file;
    }
  }
  onSubmit(): void {
    if (this.userData.username && this.userData.email && this.userData.password) {
      this.errorMessage = null;

      this.http.post(this.apiUrl, this.userData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/verify-email']);
        },

        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = error?.error?.message || 'Registration failed. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
