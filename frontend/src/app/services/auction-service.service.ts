import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private apiUrl = 'http://localhost:5000/api/auction';

  constructor(private http: HttpClient) {}

  // Create auction
  createAuction(auctionData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, auctionData, { withCredentials: true });
  }

  

  // Get all auction items
  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allitems`);
  }
  // getItemById(id: string) {
  //   return this.http.get(`${this.apiUrl}/auctiondetails/${id}`);
  // }
  // Fetch auction item by ID
  getItemById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auctiondetails/${id}`, {
      withCredentials: true, // Include cookies in the request
    });
  }
 
   // Place a bid on an auction item
   placeBid(id: string, bidData: { amount: number }): Observable<any> {
    return this.http.post(`http://localhost:5000/api/bid/place/${id}`, bidData, {
      withCredentials: true, // Include cookies in the request
    });
  }

  // auctionservice to faych my auctions
getMyAuctions(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/my-auctions`, { withCredentials: true });
}


updateAuction(id: string, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/auctions/${id}`, data);
}

deleteAuction(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/auctions/${id}`);
}



  
}
