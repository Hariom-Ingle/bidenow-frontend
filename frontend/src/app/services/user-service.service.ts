import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  // Observable to manage the user state
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() {}

  // Set user data
  setUser(user: any): void {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user)); // Sync with localStorage
  }

  // Clear user data
  clearUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user'); // Remove from localStorage
  }

  // Get the current user (synchronously)
  getUser(): any {
    return this.userSubject.getValue();
  }

  // Initialize user state from localStorage (if page refreshes)
  initializeUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser)); // Update the observable with the user data
    } else {
      this.userSubject.next(null); // If no user, set to null
    }
  }

    // Update user in the service and localStorage
    updateUser(user: any): void {
      this.userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
}
