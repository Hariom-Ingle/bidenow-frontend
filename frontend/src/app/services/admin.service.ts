import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/api/admin/';

  constructor(private http: HttpClient) {}

  // Method to fetch all users
  getUsers(): Observable<any[]> {
    
    const url = `${this.apiUrl}/users`;
    return this.http.get<any[]>(url);
  }

  // Method to fetch a single user by ID
  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/user-details/${userId}`;
    return this.http.get<any>(url);
  }

  getAllAuctions(): Observable<any[]> {
    const url = `${this.apiUrl}/getAllItems`;
    return this.http.get<any[]>(url);
  }

  getItemById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}auction-detail/${id}`, {
      withCredentials: true, // Include cookies in the request
    });
  }
  updateAuctionStatus(id: string, status: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-status/${id}`, { status }, {
      withCredentials: true, // Include cookies in the request if necessary
    });
  }

  getFeaturedAuctions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/featured-auctions`);
  }

  toggleIsFeatured(itemId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/toogle-isfeatured/${itemId}`, {});
  }
}
