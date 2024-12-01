import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5000/api/user'; // Base API URL

  constructor(private http: HttpClient, private userService: UserServiceService) {}

  // Method to handle user registration
  registerUser(userData: any, profileImage: File): Observable<any> {
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('role', userData.role);
    formData.append('profileImage', profileImage);

    return this.http.post(`${this.apiUrl}/register`, formData);
  }

  /* ************ LOGIN  REQUEST ************** */
  login(userData: { email: string; password: string; role: string }): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/login`, userData, { withCredentials: true }).subscribe(
        (response: any) => {
          this.userService.setUser(response.user); // Update user state
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  verifyEmail(code: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/verify-email`, { code }, { headers });
  }

 // Logout method
 logout(): Observable<any> {
  return new Observable((observer) => {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(
      (response: any) => {
        this.userService.clearUser(); // Clear user state
        observer.next(response);
        observer.complete();
      },
      (error) => {
        observer.error(error);
      }
    );
  });
}

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // Method to check if the user is authenticated
   // Check authentication status
   isAuthenticated(): Observable<any> {
    return new Observable((observer) => {
      this.http.get(`${this.apiUrl}/check-auth`, { withCredentials: true }).subscribe(
        (response: any) => {
          if (response.user) {
            this.userService.setUser(response.user); // Sync user state
          }
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  // Method to get the user's profile (for role-based logic)
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProfile`, { withCredentials: true });
  }
}
